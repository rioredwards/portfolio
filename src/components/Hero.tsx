import ContentfulImage from '@/lib/contentful-image';

interface HeroProps {
  primaryText: string;
  secondaryText: string;
  avatarURL: string;
}

const Hero: React.FC<HeroProps> = ({ primaryText, secondaryText, avatarURL }) => {
  return (
    <section className="w-full flex justify-around items-center flex-col">
      <div>
        <ContentfulImage
          alt="Rio Edwards"
          className="object-cover lg:h-80 lg:w-80 xl:h-92 xl:w-92 2xl:h-96 2xl:lg:w-96 rounded-full mt-20 lg:mt-16 xl:mt-20 2xl:mt-48 mb-12 lg:mb-16"
          height={384}
          width={260}
          src={avatarURL}
        />
      </div>
      <span className="text-4xl lg:text-5xl mb-8 lg:mb-12 font-bold">{primaryText}</span>
      <span className="text-2xl lg:text-3xl mb-28 lg:mb-36">{secondaryText}</span>
    </section>
  );
};

export default Hero;
