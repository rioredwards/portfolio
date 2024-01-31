import Image from 'next/image';

const ProfilePicture: React.FC = () => {
  return (
    <div className="h-60 w-60 rounded-full bg-white flex items-center justify-center drop-shadow-md">
      <Image
        src="/Rio_Edwards_PFP.jpg"
        alt="Rio Edwards Profile Picture"
        height={200}
        width={200}
        className="rounded-full h-[94%] w-[94%] object-cover"
      />
    </div>
  );
};

export default ProfilePicture;
