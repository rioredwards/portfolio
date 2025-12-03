import { z } from "zod";

// Base schemas
export const ContentfulImageSchema = z.object({
  title: z.string(),
  url: z.string().url(),
});

export const ContentfulLinkSchema = z.object({
  url: z.string().url(),
  displayText: z.string(),
});

export const AssetSchema = z.object({
  sys: z.object({
    id: z.string(),
  }),
  url: z.string().url(),
  title: z.string(),
});

export const AssetLinkSchema = z.object({
  block: z.array(AssetSchema),
});

export const RichTextContentSchema = z.object({
  json: z.any(),
  links: z
    .object({
      assets: AssetLinkSchema,
    })
    .optional(),
});

export const ShieldSchema = z.object({
  name: z.string(),
  text: z.string(),
  backgroundColor: z.string(),
  logoName: z.string(),
  logoColor: z.string(),
  style: z.string(),
});

// Main schemas
export const HeroContentSchema = z.object({
  title: z.string(),
  secondaryText: z.string(),
  tertiaryText: z.string().nullable(),
  avatar: ContentfulImageSchema,
});

export const CodeCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  type: z.enum(["website", "cli", "plugin"]),
  codeCardIcon: z.object({
    title: z.string(),
    image: ContentfulImageSchema,
    animation: z.enum(["none", "spin", "pulsate", "wiggle"]),
    bgColor: z.string(),
  }),
  description: RichTextContentSchema,
  madeWith: z.array(ShieldSchema).optional(),
  preview: ContentfulImageSchema,
  pluginIcon: ContentfulImageSchema.nullable(),
});

export const CodeDetailSchema = z.object({
  title: z.string(),
  tags: z.array(z.string()),
  headerImage: ContentfulImageSchema.optional(),
  slogan: RichTextContentSchema.optional(),
  logo: ContentfulImageSchema.optional(),
  links: z.array(ContentfulLinkSchema).optional(),
  description: RichTextContentSchema.optional(),
  madeWith: z.array(ShieldSchema),
  features: RichTextContentSchema.optional(),
  preview: ContentfulImageSchema.optional(),
  usage: RichTextContentSchema.optional(),
  configure: RichTextContentSchema.optional(),
  lessonsLearned: RichTextContentSchema.optional(),
  reflection: RichTextContentSchema.optional(),
  authors: RichTextContentSchema.optional(),
  acknowledgements: RichTextContentSchema.optional(),
  custom: RichTextContentSchema.optional(),
});

export const CodeBlockSchema = z.object({
  title: z.string(),
  content: z.string(),
  language: z.string(),
});

// GraphQL response schemas
export const GraphQLErrorSchema = z.object({
  message: z.string(),
  locations: z
    .array(
      z.object({
        line: z.number(),
        column: z.number(),
      }),
    )
    .optional(),
  path: z.array(z.union([z.string(), z.number()])).optional(),
});

export const GraphQLResponseSchema = z.object({
  data: z.unknown().nullable(),
  errors: z.array(GraphQLErrorSchema).optional(),
});
