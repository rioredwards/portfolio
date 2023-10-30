import { useEffect, useState } from 'react';

interface Props {
  url: string;
  title: string;
  className?: string;
}

const SVGFromUrl: React.FC<Props> = ({ url, title, className }) => {
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    async function getSvg() {
      const res = await fetch(url);
      const resText = await res.text();
      setSvg(resText);
    }
    getSvg();
  }, [url]);

  return (
    <>
      <span className="sr-only">{title}</span>
      {<div className={className} dangerouslySetInnerHTML={{ __html: svg || '' }} />}
    </>
  );
};

export default SVGFromUrl;
