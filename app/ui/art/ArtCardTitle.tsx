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

const ArtCardTitleContainerVariants: Variants = {
  isExpanded: {
    y: -146,
    height: 56,
    paddingBottom: 16,
    transition: spring,
  },
  isNotExpanded: {
    y: -156,
    height: 130,
    paddingBottom: 60,
    transition: spring,
  },
};

const ArtCardTitle: React.FC<Props> = ({ isExpanded, title, width }) => {
  return (
    <motion.div
      initial={false}
      animate={isExpanded ? 'isExpanded' : 'isNotExpanded'}
      variants={ArtCardTitleContainerVariants}
      className={clsx(
        width,
        'absolute z-10 flex items-end justify-center bg-gradient-to-b from-transparent to-black/75'
      )}
    >
      <motion.h3 className="text-3xl font-black text-white">{title}</motion.h3>
    </motion.div>
  );
};

export default ArtCardTitle;
