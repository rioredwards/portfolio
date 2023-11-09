import { motion } from 'framer-motion';
import { MobileNavBtn } from '@/ui/header/MobileNavBtn';

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const MobileNavMenu: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      variants={variants}
      className="z-30 fixed top-0 left-0 w-screen h-screen bg-purple-100 overflow-hidden"
    >
      <motion.ul className="absolute p-16 top-40 w-screen">
        {itemIds.map((i) => (
          <MobileNavBtn i={i} key={i} />
        ))}
      </motion.ul>
    </motion.div>
  );
};

const itemIds = [0, 1, 2, 3, 4];

export default MobileNavMenu;
