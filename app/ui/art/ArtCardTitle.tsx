import clsx from 'clsx';
import { Variants, motion } from 'framer-motion';

interface Props {
  isExpanded: boolean;
  title: string;
  width: string;
}

const spring = {
  type: 'spring',
  damping: 20,
  stiffness: 100,
};

const ArtCardTitleVariants: Variants = {
  isExpanded: {
    y: -140,
    transition: spring,
  },
  isNotExpanded: {
    y: -96,
    transition: spring,
  },
};

const ArtCardTitle: React.FC<Props> = ({ isExpanded, title, width }) => {
  return (
    <motion.div
      initial={false}
      animate={isExpanded ? 'isExpanded' : 'isNotExpanded'}
      variants={ArtCardTitleVariants}
      className={clsx(width, 'absolute -translate-y-40 z-10 flex items-center justify-center')}
    >
      <motion.h3 className="text-3xl font-black text-white">{title}</motion.h3>
    </motion.div>
  );
};

export default ArtCardTitle;
