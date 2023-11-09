import Link from 'next/link';

interface Props {
  className: string;
}

const DesktopHeader: React.FC<Props> = ({ className: cssClasses }) => {
  return (
    <header className={`mx-auto container flex justify-start py-3 px-5 w-full ${cssClasses}`}>
      <h1 className="font-semibold text-2xl whitespace-nowrap text-gray-800">RIO EDWARDS</h1>
      <nav className="ml-auto flex justify-around w-96 align-middle items-center text-gray-800">
        <Link href="/">HOME</Link>
        <Link href="/code">CODE</Link>
        <Link href="/art">ART</Link>
        <Link href="/about">ABOUT</Link>
        <Link href="/contact">CONTACT</Link>
      </nav>
    </header>
  );
};

export default DesktopHeader;
