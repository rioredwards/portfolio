import { CodeProject } from '@/lib/api';
import { motion } from 'framer-motion';
import { ForwardRefRenderFunction, forwardRef, useEffect, useState } from 'react';

interface Props {
  url: string;
  title: string;
  containerClasses?: string;
  animation?: CodeProject['codeCardIcon']['animation'];
}

export const SVGFromUrl: ForwardRefRenderFunction<HTMLDivElement, Props> = (props, ref) => {
  const { url, title, containerClasses, animation } = props;
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    async function getSvg() {
      const res = await fetch(url);
      const svgRes = await res.text();

      if (!animation) {
        setSvg(svgRes);
        return;
      }

      const svgWithAnimation = svgRes.replace(
        '<svg ',
        `<svg class="animate-intermittent-${animation}" `
      );

      setSvg(svgWithAnimation);
    }
    getSvg();
  }, [url, title, animation]);

  return (
    <motion.div ref={ref} className="h-full w-full">
      <motion.span className="sr-only">{title}</motion.span>
      {<motion.div className={containerClasses} dangerouslySetInnerHTML={{ __html: svg || '' }} />}
    </motion.div>
  );
};

const RefSVGFromUrl = forwardRef<HTMLDivElement, Props>(SVGFromUrl);

export const MotionSVGFromUrl = motion(RefSVGFromUrl);
