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
  stiffness: 60,
};

const containerVariants: Variants = {
  isExpanded: {
    y: -238,
    height: 150,
    paddingBottom: 10,
    transition: spring,
  },
  isNotExpanded: {
    y: -156,
    height: 130,
    paddingBottom: 20,
    transition: spring,
  },
};

const subTextVariants: Variants = {
  isExpanded: {
    opacity: 1,
    transition: spring,
  },
  isNotExpanded: {
    opacity: 0,
    transition: spring,
  },
};

const ArtCardTitle: React.FC<Props> = ({ isExpanded, title, width }) => {
  return (
    <motion.div
      initial={false}
      animate={isExpanded ? 'isExpanded' : 'isNotExpanded'}
      variants={containerVariants}
      className={clsx(
        width,
        { 'items-start': isExpanded },
        { 'items-center': !isExpanded },
        'absolute z-10 flex flex-col justify-end bg-gradient-to-b from-transparent to-black/75'
      )}
    >
      <motion.h3 layout className="mx-4 text-3xl font-black text-white">
        {title}
      </motion.h3>
      <motion.span
        animate={isExpanded ? 'isExpanded' : 'isNotExpanded'}
        variants={subTextVariants}
        initial={false}
        layout
        className="mx-4 text-md font-black text-white"
      >
        Decipherment shores of the cosmic ocean take root
      </motion.span>
    </motion.div>
  );
};

export default ArtCardTitle;
