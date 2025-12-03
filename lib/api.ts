"use server";

import { CodeBlock, CodeCard, CodeDetail, HeroContent } from "@/lib/dataTypes";
import env from "@/lib/env";
import {
  CODE_BLOCK_GRAPHQL_FIELDS,
  CODE_CARDS_GRAPHQL_FIELDS,
  CODE_DETAIL_GRAPHQL_FIELDS,
  HERO_GRAPHQL_FIELDS,
} from "@/lib/graphqlQueries";
import {
  CodeBlockSchema,
  CodeCardSchema,
  CodeDetailSchema,
  GraphQLResponseSchema,
  HeroContentSchema,
  ShieldSchema,
} from "@/lib/validation";
import { z } from "zod";

const CONTENTFUL_GRAPHQL_URL =
  "https://graphql.contentful.com/content/v1/spaces/";

const isDevelopment = process.env.NODE_ENV === "development";

// Custom error class for API errors
class ContentfulAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public graphQLErrors?: Array<{ message: string }>,
  ) {
    super(message);
    this.name = "ContentfulAPIError";
  }
}

// In development, let errors bubble up naturally for easier debugging
// In production, wrap them in generic messages
function handleError(error: unknown, context: string): never {
  if (isDevelopment) {
    // In dev, let Zod errors and other errors surface naturally
    throw error;
  }

  // In production, wrap in generic error
  if (error instanceof z.ZodError) {
    throw new Error(`Failed to validate ${context}`);
  }
  if (error instanceof Error) {
    throw new Error(`Failed to get ${context}: ${error.message}`);
  }
  throw new Error(`Failed to get ${context}: Unknown error`);
}

async function fetchGraphQL(query: string, preview = false): Promise<unknown> {
  // Validate environment variables
  if (!env.CONTENTFUL_SPACE_ID) {
    throw new ContentfulAPIError("CONTENTFUL_SPACE_ID is not configured");
  }

  const accessToken = preview
    ? env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : env.CONTENTFUL_ACCESS_TOKEN;

  if (!accessToken) {
    throw new ContentfulAPIError(
      `CONTENTFUL_${preview ? "PREVIEW_" : ""}ACCESS_TOKEN is not configured`,
    );
  }

  try {
    const response = await fetch(
      `${CONTENTFUL_GRAPHQL_URL}${env.CONTENTFUL_SPACE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ query }),
        // TODO: Decide on caching strategy / change revalidate time for deployment
        next: { tags: ["codeProjects"], revalidate: 30 },
      },
    );

    if (!response.ok) {
      throw new ContentfulAPIError(
        `Contentful API request failed with status ${response.status}`,
        response.status,
      );
    }

    const data = await response.json();

    // Validate GraphQL response structure
    const validatedResponse = GraphQLResponseSchema.parse(data);

    // Check for GraphQL errors
    if (validatedResponse.errors && validatedResponse.errors.length > 0) {
      throw new ContentfulAPIError(
        "GraphQL query returned errors",
        response.status,
        validatedResponse.errors.map((err) => ({ message: err.message })),
      );
    }

    if (!validatedResponse.data) {
      throw new ContentfulAPIError("GraphQL query returned no data");
    }

    return validatedResponse.data;
  } catch (error) {
    if (error instanceof ContentfulAPIError) {
      throw error;
    }
    if (isDevelopment) {
      // In dev, let Zod errors and other errors surface naturally
      throw error;
    }
    // In production, wrap in generic error
    if (error instanceof z.ZodError) {
      throw new Error("Invalid GraphQL response structure");
    }
    if (error instanceof Error) {
      throw new ContentfulAPIError(
        `Failed to fetch from Contentful: ${error.message}`,
      );
    }
    throw new ContentfulAPIError("Unknown error occurred while fetching data");
  }
}

function extractHeroContent(content: unknown): HeroContent {
  const heroContentResponseSchema = z.object({
    heroContentCollection: z.object({
      items: z.array(HeroContentSchema).min(1),
    }),
  });

  // In dev, Zod errors will bubble up naturally
  // In prod, they'll be caught and wrapped by the calling function
  const validated = heroContentResponseSchema.parse(content);
  return validated.heroContentCollection.items[0];
}

// Transform Contentful entry to extract values and flatten structure
function transformCodeCardEntry(
  entry: {
    sys: { id: string };
    madeWithCollection?: { items?: Array<unknown> };
  } & Record<string, unknown>,
) {
  const { sys, madeWithCollection, ...rest } = entry;
  return {
    id: sys.id,
    madeWith: madeWithCollection?.items ?? [],
    ...rest,
  };
}

function extractCodeCardsContent(fetchResponse: unknown): CodeCard[] {
  const codeCardEntrySchema = z
    .object({
      sys: z.object({
        id: z.string(),
      }),
      madeWithCollection: z
        .object({
          items: z.array(ShieldSchema).optional(),
        })
        .optional(),
    })
    .passthrough()
    .transform(transformCodeCardEntry);

  const codeCardsResponseSchema = z.object({
    featuredCodeProjectCollection: z.object({
      items: z.array(codeCardEntrySchema),
    }),
  });

  // In dev, Zod errors will bubble up naturally
  // In prod, they'll be caught and wrapped by the calling function
  const validated = codeCardsResponseSchema.parse(fetchResponse);
  const entries = validated.featuredCodeProjectCollection.items;

  console.log("entries", entries);

  // Validate each entry with CodeCardSchema
  return entries.map((entry) => CodeCardSchema.parse(entry));
}

// Transform Contentful code detail response to match CodeDetail type
function transformCodeDetailContent(
  content: {
    tagsCollection?: { items?: Array<{ text: string }> };
    linksCollection?: { items?: Array<{ url: string; displayText: string }> };
    madeWithCollection?: { items?: Array<unknown> };
  } & Record<string, unknown>,
) {
  const tags = content.tagsCollection?.items?.map((tag) => tag.text) ?? [];
  const links = content.linksCollection?.items ?? [];
  const madeWith = content.madeWithCollection?.items ?? [];

  // Remove collection properties and add transformed arrays
  const rest = { ...content };
  delete rest.tagsCollection;
  delete rest.linksCollection;
  delete rest.madeWithCollection;

  return { ...rest, tags, links, madeWith };
}

function extractCodeDetailContent(fetchResponse: unknown): CodeDetail {
  // Define nested collection schemas for better readability
  const tagItemSchema = z.object({ text: z.string() });
  const tagsCollectionSchema = z.object({
    items: z.array(tagItemSchema),
  });

  const linkItemSchema = z.object({
    url: z.string(),
    displayText: z.string(),
  });
  const linksCollectionSchema = z.object({
    items: z.array(linkItemSchema),
  });

  const madeWithItemSchema = z.object({
    name: z.string(),
    text: z.string(),
    backgroundColor: z.string(),
    logoName: z.string(),
    logoColor: z.string(),
    style: z.string(),
  });
  const madeWithCollectionSchema = z.object({
    items: z.array(madeWithItemSchema),
  });

  // Define the code detail entry schema with transformation
  const codeDetailEntrySchema = z
    .object({
      title: z.string(),
      tagsCollection: tagsCollectionSchema.optional(),
      linksCollection: linksCollectionSchema.optional(),
      madeWithCollection: madeWithCollectionSchema.optional(),
    })
    .passthrough()
    .transform(transformCodeDetailContent);

  const codeDetailResponseSchema = z.object({
    featuredCodeProjectCollection: z.object({
      items: z.array(codeDetailEntrySchema).min(1),
    }),
  });

  // In dev, Zod errors will bubble up naturally
  // In prod, they'll be caught and wrapped by the calling function
  const validated = codeDetailResponseSchema.parse(fetchResponse);
  const formattedContent = validated.featuredCodeProjectCollection.items[0];

  // Validate the transformed content with CodeDetailSchema
  return CodeDetailSchema.parse(formattedContent);
}

function extractCodeBlockContent(fetchResponse: unknown): CodeBlock {
  const codeBlockResponseSchema = z.object({
    codeBlockCollection: z.object({
      items: z.array(CodeBlockSchema).min(1),
    }),
  });

  // In dev, Zod errors will bubble up naturally
  // In prod, they'll be caught and wrapped by the calling function
  const validated = codeBlockResponseSchema.parse(fetchResponse);
  return validated.codeBlockCollection.items[0];
}

export async function getHeroContent(
  isDraftMode: boolean,
): Promise<HeroContent> {
  try {
    const content = await fetchGraphQL(
      `query {
      heroContentCollection(preview: ${isDraftMode ? "true" : "false"}) {
        items {
          ${HERO_GRAPHQL_FIELDS}
        }
      }
    }`,
      isDraftMode,
    );

    return extractHeroContent(content);
  } catch (error) {
    handleError(error, "hero content");
  }
}

export async function getCodeCardsContent(
  isDraftMode: boolean,
): Promise<CodeCard[]> {
  try {
    const content = await fetchGraphQL(
      `query {
      featuredCodeProjectCollection(
        order: sys_publishedAt_DESC,
        preview: ${isDraftMode ? "true" : "false"}
      ) {
        items {
          ${CODE_CARDS_GRAPHQL_FIELDS}
        }
      }
    }`,
      isDraftMode,
    );

    return extractCodeCardsContent(content);
  } catch (error) {
    handleError(error, "code cards content");
  }
}

export async function getCodeDetailContent(
  isDraftMode: boolean,
  slug: string,
): Promise<CodeDetail> {
  if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
    throw new Error("Invalid slug provided");
  }

  try {
    const entry = await fetchGraphQL(
      `query {
        featuredCodeProjectCollection (where: { slug: "${slug}" }, limit: 1) {
        items {
          ${CODE_DETAIL_GRAPHQL_FIELDS}
        }
      }
    }`,
      isDraftMode,
    );

    return extractCodeDetailContent(entry);
  } catch (error) {
    handleError(error, "code detail content");
  }
}

export async function getCodeBlockContent(
  isDraftMode: boolean,
  blockId: string,
): Promise<CodeBlock> {
  if (!blockId || typeof blockId !== "string" || blockId.trim().length === 0) {
    throw new Error("Invalid blockId provided");
  }

  try {
    const entry = await fetchGraphQL(
      `query {
        codeBlockCollection (where: { sys: { id: "${blockId}" } }, limit: 1) {
        items {
          ${CODE_BLOCK_GRAPHQL_FIELDS}
        }
      }
    }`,
      isDraftMode,
    );

    return extractCodeBlockContent(entry);
  } catch (error) {
    handleError(error, "code block content");
  }
}
