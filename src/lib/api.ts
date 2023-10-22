const FEATURED_PROJECT_THUMBNAIL_GRAPHQL_FIELDS = `
  title
  slug
  preview {
    title
    url
  }
  tagsCollection {
    items {
      text
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

interface FeaturedProjectThumbnail {
  title: string;
  slug: string;
  preview: {
    title: string;
    url: string;
  };
  tags: string[];
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

function extractPost(fetchResponse: any): any {
  return fetchResponse?.data?.postCollection?.items?.[0];
}

function extractFeaturedProjectEntries(fetchResponse: any): any[] {
  const entries = fetchResponse?.data?.featuredCodeProjectCollection?.items;
  const entiresWithExtractedTags = entries?.map((entry: any) => {
    const tags = entry?.tagsCollection?.items?.map((item: any) => item?.text);
    delete entry.tagsCollection;
    return {
      ...entry,
      tags,
    };
  });
  return entiresWithExtractedTags;
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

export async function getFeaturedProjectThumbnails(
  isDraftMode: boolean
): Promise<FeaturedProjectThumbnail[]> {
  const entries = await fetchGraphQL(
    `query {
      featuredCodeProjectCollection(
        order: sys_publishedAt_DESC,
        preview: ${isDraftMode ? 'true' : 'false'}
      ) {
        items {
          ${FEATURED_PROJECT_THUMBNAIL_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode
  );
  return extractFeaturedProjectEntries(entries);
}

// export async function getPostAndMorePosts(slug: string, preview: boolean): Promise<any> {
//   const entry = await fetchGraphQL(
//     `query {
//       postCollection(where: { slug: "${slug}" }, preview: ${preview ? 'true' : 'false'}, limit: 1) {
//         items {
//           ${POST_GRAPHQL_FIELDS}
//         }
//       }
//     }`,
//     preview
//   );
//   const entries = await fetchGraphQL(
//     `query {
//       postCollection(
//         where: { slug_not_in: "${slug}" },
//         order: date_DESC,
//         preview: ${preview ? 'true' : 'false'},
//         limit: 2) {
//         items {
//           ${POST_GRAPHQL_FIELDS}
//         }
//       }
//     }`,
//     preview
//   );
//   return {
//     post: extractPost(entry),
//     morePosts: extractPostEntries(entries),
//   };
// }
