import Image from 'next/image';

const UnderConstruction: React.FC = () => {
  return (
    <section className="w-full mt-36 flex flex-col items-center justify-center">
      <div className="max-w-4xl h-96">
        <Image
          src="/UnderConstruction.png"
          width={1920}
          height={1080}
          alt="This Page is Under Construction"
        />
      </div>
      <div className="text-2xl text-gray-500 md:text-3xl my-8 xl:my-24 text-center">
        <span>
          Go to{' '}
          <a
            href="https://bento.me/rio-edwards"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            my other site 👉
          </a>
          <br />
          <span className="text-xl">(While I finish this one)</span>
        </span>
      </div>
      {/* <hr /> */}
    </section>
  );
};

export default UnderConstruction;
