import { draftMode } from 'next/headers';
import { getFeaturedProjectThumbnails, getHeroContent } from '@/lib/api';
import Hero from '@/components/Hero';
import FeaturedCodeProjectThumbnail from '@/components/FeaturedCodeProjectThumbnail';

export default async function Page() {
  const { isEnabled: draftModeIsEnabled } = draftMode();
  const heroContent = await getHeroContent(draftModeIsEnabled);
  const {
    title,
    secondaryText,
    avatar: { url },
  } = heroContent;

  const featuredCodeProjectThumbnails = await getFeaturedProjectThumbnails(draftModeIsEnabled);

  return (
    <div className="container mx-auto px-5">
      <Hero PrimaryText={title} SecondaryText={secondaryText} AvatarURL={url} />
      <hr />
      {featuredCodeProjectThumbnails.map((featuredCodeProjectThumbnail) => (
        <FeaturedCodeProjectThumbnail
          key={featuredCodeProjectThumbnail.slug}
          {...featuredCodeProjectThumbnail}
        />
      ))}
    </div>
  );
}
