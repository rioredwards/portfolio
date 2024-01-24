interface Asset {
  sys: {
    id: string;
  };
  url: string;
  title: string;
}

interface AssetLink {
  block: Asset[];
}

interface RichTextContent {
  json: string;
  links?: {
    assets: AssetLink;
  };
}

interface HeroContent {
  title: string;
  secondaryText: string;
  tertiaryText: string;
  avatar: ContentfulImage;
}

interface Shield {
  name: string;
  text: string;
  backgroundColor: string;
  logoName: string;
  logoColor: string;
  style: string;
}

type CodeCardType = 'website' | 'cli' | 'plugin';

type CodeCardIconAnimation = 'none' | 'spin' | 'pulse' | 'wiggle';

interface ContentfulLink {
  url: string;
  displayText: string;
}

interface ContentfulImage {
  title: string;
  url: string;
}

interface CodeCard {
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

interface CodeDetail {
  title: string;
  tags: string[];
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

interface CodeBlock {
  title: string;
  content: string;
  language: string;
}

interface EmailProps {
  name: string;
  email: string;
  message: string;
}

export type {
  Asset,
  AssetLink,
  RichTextContent,
  HeroContent,
  Shield,
  CodeCardType,
  CodeCardIconAnimation,
  ContentfulLink,
  ContentfulImage,
  CodeCard,
  CodeDetail,
  CodeBlock,
  EmailProps,
};
