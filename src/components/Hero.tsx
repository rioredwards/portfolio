import ContentfulImage from '@/lib/contentful-image';
import Avatar from './Avatar';

interface HeroProps {
  PrimaryText: string;
  SecondaryText: string;
  AvatarURL: string;
}

const Hero: React.FC<HeroProps> = ({ PrimaryText, SecondaryText, AvatarURL }) => {
  return (
    <section className="w-full flex justify-around items-center flex-col">
      <div>
        <ContentfulImage
          alt="Rio Edwards"
          className="object-contain h-full rounded-full mt-20"
          height={384}
          width={260}
          src={AvatarURL}
        />
      </div>
      <span className="text-4xl mt-12">{PrimaryText}</span>
      <span className="text-2xl mt-8 mb-28">{SecondaryText}</span>
    </section>
  );
};

export default Hero;
