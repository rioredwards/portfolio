import Image from 'next/image';
import Link from 'next/link';

const SocialIcons: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default SocialIcons;
