import ContentfulImage from '@/lib/contentful-image';
import GradientText from '@/ui/GradientText';
import { HeroContent } from '@/lib/api';

interface HeroProps extends HeroContent {}

const Hero: React.FC<HeroProps> = ({ title, secondaryText, tertiaryText, avatar }) => {
  return (
    <section className="w-full flex justify-around items-center flex-col">
      <div>
        <ContentfulImage
          alt="Rio Edwards"
          className="object-cover lg:h-80 lg:w-80 xl:h-92 xl:w-92 2xl:h-96 2xl:lg:w-96 rounded-full mt-20 lg:mt-16 xl:mt-20 2xl:mt-48 mb-12 lg:mb-16"
          height={384}
          width={260}
          src={avatar.url}
        />
      </div>
      <GradientText
        elementType="h1"
        direction="to bottom right"
        colors={['#4CEA82', '#6D88EE']}
        className="text-4xl lg:text-5xl mb-8 lg:mb-12 font-black"
        offset={{ x: 0, y: -2 }}
        shadowColor="#ffffff"
      >
        {title}
      </GradientText>
      <span className="text-2xl text-gray-500 lg:text-3xl mb-28 lg:mb-36">{secondaryText}</span>
    </section>
  );
};

export default Hero;
