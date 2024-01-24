import Image from 'next/image';
import MotionGradientText from '../GradientText';
import Link from 'next/link';

const ContactForm: React.FC = () => {
  return (
    <section className="w-full">
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
      <form className="container px-4 mx-auto max-w-[60rem] grid grid-cols-[auto_1fr_1fr] grid-rows-[repeat(3,_auto)]">
        <div className="col-start-1 row-span-2 self-end max-w-min flex flex-col items-center justify-between gap-8 mb-6 mr-16">
          <Link
            className="w-10 self-center"
            href="mailto:rioredwards@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <Image src="/gmail_icon.png" width={64} height={64} alt="Gmail Icon" />
          </Link>
          <Link
            className="w-10 self-center"
            href="https://www.linkedin.com/in/rio-edwards/"
            target="_blank"
            rel="noreferrer"
          >
            <Image src="/linkedIn_icon.png" width={64} height={64} alt="Gmail Icon" />
          </Link>
          <Link
            className="w-10 self-center"
            href="https://github.com/rioredwards/"
            target="_blank"
            rel="noreferrer"
          >
            <Image src="/github_icon.svg" width={64} height={64} alt="Gmail Icon" />
          </Link>
          <Link
            className="w-10 self-center"
            href="https://www.youtube.com/channel/UCZdVYjS_Os_4e7DZAZSRxBQ"
            target="_blank"
            rel="noreferrer"
          >
            <Image src="/youtube_icon.svg" width={64} height={64} alt="Gmail Icon" />
          </Link>
        </div>
        <div className="col-start-2 flex flex-col mr-4">
          <label htmlFor="name" className="text-gray-600 text-xl font-bold mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="border border-gray-300 rounded-md p-2 mb-4"
          />
        </div>
        <div className="col-start-3 flex flex-col">
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
        <div className="col-start-2 col-span-2 flex flex-col">
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
          className="col-start-3 row-start-3 w-32 place-self-end bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 hover:from-pink-500 hover:via-red-500 hover:to-yellow-400 text-white font-bold py-2 px-4 rounded-md"
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
