import MotionGradientText from '../GradientText';
import ProfilePicture from './ProfilePicture';

const About: React.FC = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <MotionGradientText
          direction="to bottom right"
          elementType="h2"
          colors={['#F2A764', '#F26864']}
          className="text-4xl lg:text-5xl mb-8 lg:mb-20 font-black leading-loose mt-6 drop-shadow-md"
          offset={{ x: 0, y: -1 }}
          shadowColor="#633E2740"
        >
          ABOUT
        </MotionGradientText>
      </div>
      <div className="flex items-start justify-center gap-12 rounded-4xl bg-gray-200 p-8 drop-shadow-md">
        <ProfilePicture />
        <div className="flex flex-col items-start justify-center gap-6 max-w-xl mt-8">
          <h3 className="text-4xl text-gray-500">Hello 👋</h3>
          <p className="text-lg">
            {`I'm proud to have worn many hats. Made in the interiors of collapsing stars
            dispassionate extraterrestrial observer invent the universe kindling the energy hidden
            in matter galaxies extraplanetary.`}
            <br />
            <br />
            Not a sunrise but a galaxyrise courage of our questions a still more glorious dawn
            awaits stirred by starlight the only home we have ever known courage of our questions
            and billions upon billions upon billions upon billions upon billions upon billions upon
            billions.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
