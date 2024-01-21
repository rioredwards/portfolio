const HERO_GRAPHQL_FIELDS = `
  title
  secondaryText
  tertiaryText
  avatar {
    title
    url
  }
`;

const RICH_TEXT_GRAPHQL_FIELDS = `
  json
  links {
    assets {
      block {
        sys {
          id
        }
        title
        url
      }
    }
  }
`;

const CODE_CARDS_GRAPHQL_FIELDS = `
  sys {
    id
  }
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
  headerImage {
    title
    url
  }
  slogan {
    json
  }
  logo {
    title
    url
  }
  linksCollection {
    items {
      url
      displayText
    }
  }
  description {
    json
  }
  madeWithCollection {
    items {
      name
      text
      backgroundColor
      logoName
      logoColor
      style
    }
  }
  features {${RICH_TEXT_GRAPHQL_FIELDS}}
  preview {
    title
    url
  }
  usage  {${RICH_TEXT_GRAPHQL_FIELDS}}
  configure  {${RICH_TEXT_GRAPHQL_FIELDS}}
  lessonsLearned  {${RICH_TEXT_GRAPHQL_FIELDS}}
  reflection  {${RICH_TEXT_GRAPHQL_FIELDS}}
  authors  {${RICH_TEXT_GRAPHQL_FIELDS}}
  acknowledgements  {${RICH_TEXT_GRAPHQL_FIELDS}}
  custom  {${RICH_TEXT_GRAPHQL_FIELDS}}
`;

const CODE_BLOCK_GRAPHQL_FIELDS = `
  title
  content
  language
`;

export interface Asset {
  sys: {
    id: string;
  };
  url: string;
  title: string;
}

export interface AssetLink {
  block: Asset[];
}

export interface RichTextContent {
  json: string;
  links?: {
    assets: AssetLink;
  };
}

export interface HeroContent {
  title: string;
  secondaryText: string;
  tertiaryText: string;
  avatar: ContentfulImage;
}

export interface Shield {
  name: string;
  text: string;
  backgroundColor: string;
  logoName: string;
  logoColor: string;
  style: string;
}

export type CodeCardType = 'website' | 'cli' | 'plugin';

export type CodeCardIconAnimation = 'none' | 'spin' | 'pulse' | 'wiggle';

export interface ContentfulLink {
  url: string;
  displayText: string;
}

export interface ContentfulImage {
  title: string;
  url: string;
}

export interface CodeCard {
  id: string;
  title: string;
  slug: string;
  type: CodeCardType;
  codeCardIcon: {
    title: string;
    image: ContentfulImage;
    animation: CodeCardIconAnimation;
    bgColor: string;
  };
  preview: ContentfulImage;
  pluginIcon: ContentfulImage;
}

export interface CodeDetail {
  title: string;
  headerImage?: ContentfulImage;
  slogan?: RichTextContent;
  logo?: ContentfulImage;
  links?: ContentfulLink[];
  description?: RichTextContent;
  madeWith: Shield[];
  features?: RichTextContent;
  preview?: ContentfulImage;
  usage?: RichTextContent;
  configure?: RichTextContent;
  lessonsLearned?: RichTextContent;
  reflection?: RichTextContent;
  authors?: RichTextContent;
  acknowledgements?: RichTextContent;
  custom?: RichTextContent;
}

export interface CodeBlock {
  title: string;
  content: string;
  language: string;
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
  const entries = fetchResponse?.data?.featuredCodeProjectCollection?.items.map((entry: any) => {
    // for each entry, extract the id from the sys property and remove the sys property
    const { sys, ...rest } = entry;
    return { id: sys.id, ...rest };
  });
  return entries;
}

function extractCodeDetailContent(fetchResponse: any): CodeDetail {
  const codeDetailContent = fetchResponse?.data?.featuredCodeProjectCollection?.items[0];
  const {
    linksCollection: { items: links },
    madeWithCollection: { items: madeWith },
    ...rest
  } = codeDetailContent;
  const formattedCodeDetailContent = { ...rest, links, madeWith };
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
