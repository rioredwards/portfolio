import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="flex justify-start py-3 px-5 w-full">
      <Link href="/">
        <span className="font-semibold text-2xl whitespace-nowrap">RIO EDWARDS</span>
      </Link>
      <nav className="ml-auto flex justify-around w-96 align-middle items-center">
        <Link href="/">HOME</Link>
        <Link href="/code">CODE</Link>
        <Link href="/art">ART</Link>
        <Link href="/about">ABOUT</Link>
        <Link href="/contact">CONTACT</Link>
      </nav>
    </header>
  );
};

export default Header;
