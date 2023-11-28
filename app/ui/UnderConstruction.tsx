import Image from 'next/image';

const UnderConstruction: React.FC = () => {
  return (
    <section className="w-full h-96 mt-36 flex items-center justify-center">
      <div className="max-w-4xl">
        <Image
          src="/UnderConstruction.png"
          width={1920}
          height={1080}
          alt="This Page is Under Construction"
        />
      </div>
    </section>
  );
};

export default UnderConstruction;
