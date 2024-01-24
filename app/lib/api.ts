'use server';

import { CodeBlock, CodeCard, CodeDetail, HeroContent } from './dataTypes';
import {
  CODE_BLOCK_GRAPHQL_FIELDS,
  CODE_CARDS_GRAPHQL_FIELDS,
  CODE_DETAIL_GRAPHQL_FIELDS,
  HERO_GRAPHQL_FIELDS,
} from './graphqlQueries';

async function fetchGraphQL(query: string, preview = false): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      // TODO: Decide on caching strategy / change revalidate time for deployment
      next: { tags: ['codeProjects'], revalidate: 30 },
    }
  ).then((response) => response.json());
}

function extractHeroContent(content: any): any {
  return content?.data?.heroContentCollection?.items?.[0];
}

function extractCodeCardsContent(fetchResponse: any): any[] {
  const entries = fetchResponse?.data?.featuredCodeProjectCollection?.items.map((entry: any) => {
    // for each entry, extract the id from the sys property and remove the sys property
    const { sys, ...rest } = entry;
    return { id: sys.id, ...rest };
  });
  return entries;
}

function extractCodeDetailContent(fetchResponse: any): CodeDetail {
  const codeDetailContent = fetchResponse?.data?.featuredCodeProjectCollection?.items[0];
  const tags = codeDetailContent?.tagsCollection?.items?.map((tag: any) => tag.text);
  const {
    linksCollection: { items: links },
    madeWithCollection: { items: madeWith },
    ...rest
  } = codeDetailContent;
  const formattedCodeDetailContent = { ...rest, links, madeWith, tags };
  return formattedCodeDetailContent as CodeDetail;
}

function extractCodeBlockContent(fetchResponse: any): CodeBlock {
  const codeBlockContent = fetchResponse?.data?.codeBlockCollection?.items[0];
  return codeBlockContent as CodeBlock;
}

export async function getHeroContent(isDraftMode: boolean): Promise<HeroContent> {
  const content = await fetchGraphQL(
    `query {
      heroContentCollection(preview: ${isDraftMode ? 'true' : 'false'}) {
        items {
          ${HERO_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode
  );

  return extractHeroContent(content);
}

export async function getCodeCardsContent(isDraftMode: boolean): Promise<CodeCard[]> {
  const entries = await fetchGraphQL(
    `query {
      featuredCodeProjectCollection(
        order: sys_publishedAt_DESC,
        preview: ${isDraftMode ? 'true' : 'false'}
      ) {
        items {
          ${CODE_CARDS_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode
  );

  return extractCodeCardsContent(entries);
}

export async function getCodeDetailContent(
  isDraftMode: boolean,
  slug: string
): Promise<CodeDetail> {
  const entry = await fetchGraphQL(
    `query {
        featuredCodeProjectCollection (where: { slug: "${slug}" }, limit: 1) {
        items {
          ${CODE_DETAIL_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode
  );

  return extractCodeDetailContent(entry);
}

export async function getCodeBlockContent(
  isDraftMode: boolean,
  blockId: string
): Promise<CodeBlock> {
  const entry = await fetchGraphQL(
    `query {
        codeBlockCollection (where: { sys: { id: "${blockId}" } }, limit: 1) {
        items {
          ${CODE_BLOCK_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode
  );

  return extractCodeBlockContent(entry);
}
