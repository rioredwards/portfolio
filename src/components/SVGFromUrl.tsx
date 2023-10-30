import { useEffect, useState } from 'react';

interface Props {
  url: string;
  title: string;
  containerClasses?: string;
  spin?: boolean;
}

const SVGFromUrl: React.FC<Props> = ({ url, title, containerClasses, spin }) => {
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    async function getSvg() {
      const res = await fetch(url);
      let svgRes = await res.text();

      if (spin) {
        svgRes = svgRes.replace('<svg ', '<svg class="animate-spin-slow" ');
      }

      setSvg(svgRes);
    }
    getSvg();
  }, [url, title, spin]);

  return (
    <>
      <span className="sr-only">{title}</span>
      {<div className={containerClasses} dangerouslySetInnerHTML={{ __html: svg || '' }} />}
    </>
  );
};

export default SVGFromUrl;
