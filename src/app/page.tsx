import { draftMode } from 'next/headers';
import { getHeroContent } from '@/lib/api';
import Hero from '@/components/Hero';

export default async function Page() {
  const { isEnabled: draftModeIsEnabled } = draftMode();
  const heroContent = await getHeroContent(draftModeIsEnabled);
  const {
    title,
    secondaryText,
    avatar: { url },
  } = heroContent;

  return (
    <div className="container mx-auto px-5">
      <h1>My Page</h1>
      <Hero PrimaryText={title} SecondaryText={secondaryText} AvatarURL={url} />
    </div>
  );
}
