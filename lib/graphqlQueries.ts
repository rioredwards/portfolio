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
  tagsCollection {
    items {
      text
    }
  }
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

export {
  CODE_BLOCK_GRAPHQL_FIELDS,
  CODE_CARDS_GRAPHQL_FIELDS,
  CODE_DETAIL_GRAPHQL_FIELDS,
  HERO_GRAPHQL_FIELDS,
  RICH_TEXT_GRAPHQL_FIELDS,
};
