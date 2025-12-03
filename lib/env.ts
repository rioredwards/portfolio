const env = {
  CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID as string,
  CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN: process.env
    .CONTENTFUL_PREVIEW_ACCESS_TOKEN as string,
  CONTENTFUL_PREVIEW_SECRET: process.env.CONTENTFUL_PREVIEW_SECRET as string,
  CONTENTFUL_REVALIDATE_SECRET: process.env
    .CONTENTFUL_REVALIDATE_SECRET as string,
  CONTENTFUL_MANAGEMENT_TOKEN: process.env
    .CONTENTFUL_MANAGEMENT_TOKEN as string,
  GOOGLE_APP_NAME: process.env.GOOGLE_APP_NAME as string,
  GOOGLE_APP_SENDER_USERNAME: process.env.GOOGLE_APP_SENDER_USERNAME as string,
  GOOGLE_APP_SENDER_PASSWORD: process.env.GOOGLE_APP_SENDER_PASSWORD as string,
  GOOGLE_APP_RECEIVER_USERNAME: process.env
    .GOOGLE_APP_RECEIVER_USERNAME as string,
};

// Verify all env variables exist
Object.entries(env).forEach(([key, val]) => {
  if (!val) console.warn(`${key} not defined! Check environment vars...`);
});

export default env;
