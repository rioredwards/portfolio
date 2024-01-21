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
