import MotionGradientText from '../GradientText';
const ContactForm: React.FC = () => {
  return (
    <section>
      <div className="flex justify-center items-center">
        <MotionGradientText
          elementType="h1"
          direction="to bottom right"
          colors={['#FED237', '#FEAD2A']}
          className="mt-12 text-4xl md:text-5xl mb-8 md:mb-12 font-black leading-loose"
          offset={{ x: 0, y: -1 }}
          shadowColor="#245B5C40"
        >
          Say Hi
        </MotionGradientText>
      </div>
      <form className="container px-4 mx-auto max-w-[50rem]">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-600 text-xl font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="border border-gray-300 rounded-md p-2 mb-4"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-600 text-xl font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="border border-gray-300 rounded-md p-2 mb-4"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="message" className="text-gray-600 text-xl font-bold mb-2">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            className="border border-gray-300 rounded-md p-2 mb-4"
            rows={5}
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 hover:from-pink-500 hover:via-red-500 hover:to-yellow-400 text-white font-bold py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
