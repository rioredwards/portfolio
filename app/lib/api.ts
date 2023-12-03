import { Document } from '@contentful/rich-text-types';

const CODE_PROJECT_CARDS_GRAPHQL_FIELDS = `
  title
  slug
  type
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
    image {
      url
    }
    animation
    bgColor
  }
  pluginIcon {
    title
    url
  }
`;

const HERO_GRAPHQL_FIELDS = `
  title
  secondaryText
  tertiaryText
  avatar {
    url
  }
`;

export interface HeroContent {
  title: string;
  secondaryText: string;
  tertiaryText: string;
  avatar: {
    url: string;
  };
}

export type CodeCardType = 'website' | 'cli' | 'plugin';

export type CodeCardIconAnimation = 'none' | 'spin' | 'pulse' | 'wiggle';

export interface CodeProject {
  title: string;
  slug: string;
  type: CodeCardType;
  tags: string[];
  codeCardIcon: {
    title: string;
    image: {
      url: string;
    };
    animation: CodeCardIconAnimation;
    bgColor: string;
  };
  pluginIcon?: {
    title: string;
    url: string;
  };
  preview: {
    title: string;
    url: string;
  };
  slogan: Document | null;
  description: Document;
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
      // TODO: Decide on caching strategy / change revalidate time for deployment
      next: { tags: ['codeProjects'], revalidate: 30 },
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
