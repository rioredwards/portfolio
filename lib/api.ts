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
} from "@/lib/validation";
import { z } from "zod";

const CONTENTFUL_GRAPHQL_URL =
  "https://graphql.contentful.com/content/v1/spaces/";

// Custom error classes for better error handling
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

class ContentfulValidationError extends Error {
  constructor(
    message: string,
    public zodErrors: z.ZodError,
  ) {
    super(message);
    this.name = "ContentfulValidationError";
  }
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
    if (error instanceof z.ZodError) {
      throw new ContentfulValidationError(
        "Invalid GraphQL response structure",
        error,
      );
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

  try {
    const validated = heroContentResponseSchema.parse(content);
    return validated.heroContentCollection.items[0];
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ContentfulValidationError(
        "Failed to validate hero content",
        error,
      );
    }
    throw error;
  }
}

function extractCodeCardsContent(fetchResponse: unknown): CodeCard[] {
  const codeCardsResponseSchema = z.object({
    featuredCodeProjectCollection: z.object({
      items: z.array(
        z
          .object({
            sys: z.object({
              id: z.string(),
            }),
          })
          .passthrough()
          .transform((entry) => {
            const { sys, ...rest } = entry;
            return { id: sys.id, ...rest };
          }),
      ),
    }),
  });

  try {
    const validated = codeCardsResponseSchema.parse(fetchResponse);
    const entries = validated.featuredCodeProjectCollection.items;

    // Validate each entry with CodeCardSchema
    return entries.map((entry) => CodeCardSchema.parse(entry));
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ContentfulValidationError(
        "Failed to validate code cards content",
        error,
      );
    }
    throw error;
  }
}

function extractCodeDetailContent(fetchResponse: unknown): CodeDetail {
  const codeDetailResponseSchema = z.object({
    featuredCodeProjectCollection: z.object({
      items: z
        .array(
          z
            .object({
              title: z.string(),
              tagsCollection: z.object({
                items: z.array(z.object({ text: z.string() })),
              }),
              linksCollection: z.object({
                items: z.array(
                  z.object({
                    url: z.string(),
                    displayText: z.string(),
                  }),
                ),
              }),
              madeWithCollection: z.object({
                items: z.array(
                  z.object({
                    name: z.string(),
                    text: z.string(),
                    backgroundColor: z.string(),
                    logoName: z.string(),
                    logoColor: z.string(),
                    style: z.string(),
                  }),
                ),
              }),
            })
            .passthrough()
            .transform((codeDetailContent) => {
              const tags =
                codeDetailContent.tagsCollection?.items?.map(
                  (tag: { text: string }) => tag.text,
                ) || [];
              const links = codeDetailContent.linksCollection?.items || [];
              const madeWith =
                codeDetailContent.madeWithCollection?.items || [];
              const {
                tagsCollection,
                linksCollection,
                madeWithCollection,
                ...rest
              } = codeDetailContent;
              return { ...rest, tags, links, madeWith };
            }),
        )
        .min(1),
    }),
  });

  try {
    const validated = codeDetailResponseSchema.parse(fetchResponse);
    const formattedContent = validated.featuredCodeProjectCollection.items[0];

    // Validate the transformed content with CodeDetailSchema
    return CodeDetailSchema.parse(formattedContent);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ContentfulValidationError(
        "Failed to validate code detail content",
        error,
      );
    }
    throw error;
  }
}

function extractCodeBlockContent(fetchResponse: unknown): CodeBlock {
  const codeBlockResponseSchema = z.object({
    codeBlockCollection: z.object({
      items: z.array(CodeBlockSchema).min(1),
    }),
  });

  try {
    const validated = codeBlockResponseSchema.parse(fetchResponse);
    return validated.codeBlockCollection.items[0];
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ContentfulValidationError(
        "Failed to validate code block content",
        error,
      );
    }
    throw error;
  }
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
    if (
      error instanceof ContentfulAPIError ||
      error instanceof ContentfulValidationError
    ) {
      throw error;
    }
    throw new ContentfulAPIError(
      `Failed to get hero content: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export async function getCodeCardsContent(
  isDraftMode: boolean,
): Promise<CodeCard[]> {
  try {
    const entries = await fetchGraphQL(
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

    return extractCodeCardsContent(entries);
  } catch (error) {
    if (
      error instanceof ContentfulAPIError ||
      error instanceof ContentfulValidationError
    ) {
      throw error;
    }
    throw new ContentfulAPIError(
      `Failed to get code cards content: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export async function getCodeDetailContent(
  isDraftMode: boolean,
  slug: string,
): Promise<CodeDetail> {
  if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
    throw new ContentfulAPIError("Invalid slug provided");
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
    if (
      error instanceof ContentfulAPIError ||
      error instanceof ContentfulValidationError
    ) {
      throw error;
    }
    throw new ContentfulAPIError(
      `Failed to get code detail content: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export async function getCodeBlockContent(
  isDraftMode: boolean,
  blockId: string,
): Promise<CodeBlock> {
  if (!blockId || typeof blockId !== "string" || blockId.trim().length === 0) {
    throw new ContentfulAPIError("Invalid blockId provided");
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
    if (
      error instanceof ContentfulAPIError ||
      error instanceof ContentfulValidationError
    ) {
      throw error;
    }
    throw new ContentfulAPIError(
      `Failed to get code block content: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
