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
        <AnimatedGridColumn
          imgUrls={['/Temp/1.png', '/Temp/2.png', '/Temp/3.png']}
          initialExpandedBox={3}
        />
        <AnimatedGridColumn
          imgUrls={['/Temp/4.png', '/Temp/5.png', '/Temp/6.png']}
          initialExpandedBox={2}
        />
        <AnimatedGridColumn
          imgUrls={['/Temp/7.png', '/Temp/8.png', '/Temp/9.png']}
          initialExpandedBox={1}
        />
      </div>
    </>
  );
};

export default Art;
