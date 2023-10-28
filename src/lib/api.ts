import { Document } from '@contentful/rich-text-types';

const CODE_PROJECT_CARDS_GRAPHQL_FIELDS = `
  title
  slug
  preview {
    title
    url
  }
  description {
      json
  }
  slogan {
    json
  }
  tagsCollection {
    items {
      text
    }
  }
  codeCardIcon {
    title
    type
    iconGrayscale {
      url
    }
    iconColored {
      url
    }
  }
`;

const HERO_GRAPHQL_FIELDS = `
  title
  secondaryText
  avatar {
    url
  }
`;

interface HeroContent {
  title: string;
  secondaryText: string;
  avatar: {
    url: string;
  };
}

export type CodeCardType = 'website' | 'cli' | 'plugin';

export interface CodeProject {
  title: string;
  slug: string;
  preview: {
    title: string;
    url: string;
  };
  tags: string[];
  description: Document;
  slogan: Document | null;
  codeCardIcon: {
    title: string;
    type: CodeCardType;
    iconGrayscale: {
      url: string;
    };
    iconColored: {
      url: string;
    };
  };
}

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
      next: { tags: ['posts'] },
    }
  ).then((response) => response.json());
}

function extractCodeProjectCardEntries(fetchResponse: any): any[] {
  const entries = fetchResponse?.data?.featuredCodeProjectCollection?.items;
  const formattedEntries = entries?.map((entry: any) => {
    const tags = entry?.tagsCollection?.items?.map((item: any) => item?.text);
    const description = entry?.description?.json;
    const slogan = entry?.slogan?.json;
    delete entry.tagsCollection;
    return {
      ...entry,
      description,
      slogan,
      tags,
    };
  });
  return formattedEntries;
}

function extractHeroContent(content: any): any {
  return content?.data?.heroContentCollection?.items?.[0];
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

export async function getCodeProjectCardsContent(isDraftMode: boolean): Promise<CodeProject[]> {
  const entries = await fetchGraphQL(
    `query {
      featuredCodeProjectCollection(
        order: sys_publishedAt_DESC,
        preview: ${isDraftMode ? 'true' : 'false'}
      ) {
        items {
          ${CODE_PROJECT_CARDS_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode
  );
  return extractCodeProjectCardEntries(entries);
}
