import MotionGradientText from '../GradientText';
import clsx from 'clsx';
import AnimatedGridColumn from './AnimatedGridColumn';

const Art: React.FC = () => {
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
      <div className={clsx('w-full h-[30rem] flex items-start justify-center gap-8')}>
        <AnimatedGridColumn initialExpandedBox={3} columnNum={1} />
        <AnimatedGridColumn initialExpandedBox={2} columnNum={2} />
        <AnimatedGridColumn initialExpandedBox={1} columnNum={3} />
      </div>
    </>
  );
};

export default Art;
