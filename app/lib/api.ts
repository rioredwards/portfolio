const HERO_GRAPHQL_FIELDS = `
  title
  secondaryText
  tertiaryText
  avatar {
    title
    url
  }
`;

const CODE_CARDS_GRAPHQL_FIELDS = `
  title
  slug
  type
  codeCardIcon {
    title
    image {
      title
      url
    }
    animation
    bgColor
  }
  preview {
    title
    url
  }
  pluginIcon {
    title
    url
  }
`;

const CODE_DETAIL_GRAPHQL_FIELDS = `
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
`;

export interface HeroContent {
  title: string;
  secondaryText: string;
  tertiaryText: string;
  avatar: {
    title: string;
    url: string;
  };
}

export type CodeCardType = 'website' | 'cli' | 'plugin';

export type CodeCardIconAnimation = 'none' | 'spin' | 'pulse' | 'wiggle';

export interface CodeCard {
  title: string;
  slug: string;
  type: CodeCardType;
  codeCardIcon: {
    title: string;
    image: {
      title: string;
      url: string;
    };
    animation: CodeCardIconAnimation;
    bgColor: string;
  };
  preview: {
    title: string;
    url: string;
  };
  pluginIcon: {
    title: string;
    url: string;
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
      // TODO: Decide on caching strategy / change revalidate time for deployment
      next: { tags: ['codeProjects'], revalidate: 30 },
    }
  ).then((response) => response.json());
}

function extractHeroContent(content: any): any {
  return content?.data?.heroContentCollection?.items?.[0];
}

function extractCodeCardsContent(fetchResponse: any): any[] {
  const entries = fetchResponse?.data?.featuredCodeProjectCollection?.items;
  return entries;
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
