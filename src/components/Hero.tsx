import ContentfulImage from '@/lib/contentful-image';
import Avatar from './Avatar';

interface HeroProps {
  PrimaryText: string;
  SecondaryText: string;
  AvatarURL: string;
}

const Hero: React.FC<HeroProps> = ({ PrimaryText, SecondaryText, AvatarURL }) => {
  return (
    <section className="w-full flex justify-between items-center flex-col">
      <div className="mt-10 mb-4">
        <ContentfulImage
          alt="Rio Edwards"
          className="object-contain h-full rounded-full"
          height={384}
          width={260}
          src={AvatarURL}
        />
      </div>
      <span className="text-4xl mt-4 mb-4">{PrimaryText}</span>
      <span className="text-2xl mt-2 mb-10">{SecondaryText}</span>
    </section>
  );
};

export default Hero;
