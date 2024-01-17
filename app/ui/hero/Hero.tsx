import ContentfulImage from '@/ui/ContentfulImage';
import GradientText from '@/ui/GradientText';
import { HeroContent } from '@/lib/api';

interface HeroProps extends HeroContent {}

const Hero: React.FC<HeroProps> = ({ title, secondaryText, avatar }) => {
  return (
    <>
      <ContentfulImage
        alt="Rio Edwards"
        className="mt-28 object-cover rounded-full"
        height={300}
        width={300}
        src={avatar.url}
        priority={true}
      />
      <GradientText
        elementType="h1"
        direction="to bottom right"
        colors={['#4CEA82', '#6D88EE']}
        className="mt-12 text-4xl lg:text-5xl mb-8 lg:mb-12 font-black leading-loose"
        offset={{ x: 0, y: -1 }}
        shadowColor="#245B5C40"
      >
        {title}
      </GradientText>
      <span className="text-2xl text-gray-500 lg:text-3xl">{secondaryText}</span>
    </>
  );
};

export default Hero;
