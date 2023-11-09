import ContentfulImage from '@/ui/imageComponents/ContentfulImage';
import GradientText from '@/ui/GradientText';
import { HeroContent } from '@/lib/api';

interface HeroProps extends HeroContent {}

const Hero: React.FC<HeroProps> = ({ title, secondaryText, avatar }) => {
  return (
    <section className="w-full flex justify-around items-center flex-col">
      <div>
        <ContentfulImage
          alt="Rio Edwards"
          className="mt-28 object-cover rounded-full"
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
