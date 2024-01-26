import MotionGradientText from '../GradientText';
import clsx from 'clsx';
import cssStyles from '@/ui/art/Art.module.css';

const Art: React.FC = () => {
  const gridBoxCSSClasses = 'bg-gray-200 rounded-2xl w-full h-full';

  return (
    <>
      <MotionGradientText
        direction="to bottom right"
        elementType="h2"
        colors={['#F2A764', '#F26864']}
        className="text-4xl lg:text-5xl mb-8 lg:mb-20 font-black leading-loose mt-6 drop-shadow-md"
        offset={{ x: 0, y: -1 }}
        shadowColor="#633E2740"
      >
        ART
      </MotionGradientText>
      <div
        className={clsx(
          'w-full max-w-[65rem] h-[30rem] grid grid-cols-3 grid-rows-8 gap-y-4 gap-x-4',
          cssStyles.gridContainer
        )}
      >
        <div className={clsx(gridBoxCSSClasses, cssStyles.gridBox1)} />
        <div className={clsx(gridBoxCSSClasses, cssStyles.gridBox2)} />
        <div className={clsx(gridBoxCSSClasses, cssStyles.gridBox3)} />
      </div>
    </>
  );
};

export default Art;
