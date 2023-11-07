import ContentfulImage from '@/lib/contentful-image';
import GradientText from '@/ui/GradientText';
import { HeroContent } from '@/lib/api';
import params from '@/ui/params';
import { breakPointsToClass } from '@/utils/twClassHelpers';

interface HeroProps extends HeroContent {}

const Hero: React.FC<HeroProps> = ({ title, secondaryText, avatar }) => {
  const imageSizes = `${breakPointsToClass(params.AVATAR_SIZES, 'h')} ${breakPointsToClass(
    params.AVATAR_SIZES,
    'w'
  )}`;

  const imageTopMargins = breakPointsToClass(params.AVATAR_TOP_MARGINS, 'mt');

  return (
    <section className="w-full flex justify-around items-center flex-col">
      <div>
        <ContentfulImage
          alt="Rio Edwards"
          className={`object-cover rounded-full mb-12 lg:mb-16 ${imageSizes} ${imageTopMargins}`}
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
