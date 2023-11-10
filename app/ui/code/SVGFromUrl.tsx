import { CodeProject } from '@/lib/api';
import { useEffect, useState } from 'react';

interface Props {
  url: string;
  title: string;
  containerClasses?: string;
  animation: CodeProject['codeCardIcon']['animation'];
}

const SVGFromUrl: React.FC<Props> = ({ url, title, containerClasses, animation }) => {
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    async function getSvg() {
      const res = await fetch(url);
      const svgRes = await res.text();

      const svgWithAddedClasses = svgRes.replace(
        '<svg ',
        `<svg class="animate-intermittent-${animation}" `
      );

      setSvg(svgWithAddedClasses);
    }
    getSvg();
  }, [url, title, animation]);

  return (
    <>
      <span className="sr-only">{title}</span>
      {<div className={containerClasses} dangerouslySetInnerHTML={{ __html: svg || '' }} />}
    </>
  );
};

export default SVGFromUrl;
