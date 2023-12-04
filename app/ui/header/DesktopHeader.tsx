import Link from 'next/link';

interface Props {
  className: string;
}

const DesktopHeader: React.FC<Props> = ({ className: cssClasses }) => {
  return (
    <header className={`fixed top-0 left-0 z-40 w-full bg-white/80 backdrop-blur-lg ${cssClasses}`}>
      <div className="mx-auto container flex justify-start py-3 px-5">
        <Link href="#home">
          <h1 className="font-semibold text-2xl whitespace-nowrap text-gray-800">RIO EDWARDS</h1>
        </Link>
        <nav className="ml-auto flex justify-around w-96 align-middle items-center text-gray-800">
          <Link href="#home">HOME</Link>
          <Link href="#code">CODE</Link>
          <Link href="#art">ART</Link>
          <Link href="#about">ABOUT</Link>
          <Link href="#contact">CONTACT</Link>
        </nav>
      </div>
    </header>
  );
};

export default DesktopHeader;
