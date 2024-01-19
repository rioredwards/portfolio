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
  id: string;
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

export interface CodeDetail {
  title: string;
  headerImage: {
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
  const entries = fetchResponse?.data?.featuredCodeProjectCollection?.items.map((entry: any) => {
    // for each entry, extract the id from the sys property and remove the sys property
    const { sys, ...rest } = entry;
    return { id: sys.id, ...rest };
  });
  return entries;
}

function extractCodeDetailContent(fetchResponse: any): CodeDetail {
  const codeDetailContent = fetchResponse?.data?.featuredCodeProjectCollection?.items[0];
  // TODO: format the data here
  return codeDetailContent as CodeDetail;
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

// const CODE_DETAIL_GRAPHQL_FIELDS = `
//   title
//   type
//   headerImage {
//     title
//     url
//   }
//   preview {
//     title
//     url
//   }
//   logo {
//     title
//     url
//   }
//   linksCollection {
//     items {
//       url
//       displayText
//       name
//     }
//   }
//   madeWithCollection {
//     items {
//       name
//       text
//       backgroundColor
//       logoName
//       logoColor
//       style
//     }
//   }
//   slogan {
//     json
//   }
//   description {
//     json
//   }
//   tagsCollection {
//     items {
//       text
//     }
//   }
//   features {
//     json
//   }
//   usage {
//     json
//     links {
//       assets {
//         block {
//           sys {
//             id
//           }
//           title
//           description
//           fileName
//           contentType
//           url
//         }
//       }
//     }
//   }
//   configure {
//     json
//   }
//   lessonsLearned {
//     json
//   }
//   reflection {
//     json
//   }
//   reflection {
//     json
//   }
//   authors {
//     json
//   }
//   acknowledgements {
//     json
//   }
//   custom {
//     json
//   }
// `;
