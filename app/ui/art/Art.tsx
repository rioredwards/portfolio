import MotionGradientText from '../GradientText';
import clsx from 'clsx';

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
      <div className="w-full max-w-[65rem] h-[30rem] grid grid-cols-3 grid-rows-4 gap-y-4 gap-x-4">
        <div className={clsx('col-start-1 row-start-1 row-span-1', gridBoxCSSClasses)} />
        <div className={clsx('col-start-1 row-start-2 row-span-1', gridBoxCSSClasses)} />
        <div className={clsx('col-start-1 row-start-3 row-span-2', gridBoxCSSClasses)} />

        <div className={clsx('col-start-2 row-start-1 row-span-1', gridBoxCSSClasses)} />
        <div className={clsx('col-start-2 row-start-2 row-span-2', gridBoxCSSClasses)} />
        <div className={clsx('col-start-2 row-start-4 row-span-1', gridBoxCSSClasses)} />

        <div className={clsx('col-start-3 row-start-1 row-span-2', gridBoxCSSClasses)} />
        <div className={clsx('col-start-3 row-start-3 row-span-1', gridBoxCSSClasses)} />
        <div className={clsx('col-start-3 row-start-4 row-span-1', gridBoxCSSClasses)} />
      </div>
    </>
  );
};

export default Art;
