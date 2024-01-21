'use client';
import { MotionContentfulImage } from '@/ui/ContentfulImage';
import { MotionGradientText } from '@/ui/GradientText';
import { HeroContent } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps extends HeroContent {}

const heroContainerVariants = {
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const avatarVariants = {
  initial: {
    scale: 0.6,
    opacity: 0,
    transition: {
      scale: { stiffness: 1000 },
    },
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      scale: { stiffness: 1000 },
    },
  },
};

const heroTextVariants = {
  initial: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
};

const Hero: React.FC<HeroProps> = ({ title, secondaryText, avatar }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={'initial'}
        animate={'visible'}
        variants={heroContainerVariants}
        className="flex flex-col items-center"
      >
        <MotionContentfulImage
          variants={avatarVariants}
          alt="Rio Edwards"
          className="2xl:w-80 xl:w-64 md:w-56 rounded-full"
          height={300}
          width={300}
          src={avatar.url}
          priority={true}
        />
        <MotionGradientText
          variants={heroTextVariants}
          elementType="h1"
          direction="to bottom right"
          colors={['#4CEA82', '#6D88EE']}
          className="opacity-0 mt-12 text-4xl md:text-5xl mb-8 md:mb-12 font-black leading-loose"
          offset={{ x: 0, y: -1 }}
          shadowColor="#245B5C40"
        >
          {title}
        </MotionGradientText>
        <motion.div variants={heroTextVariants} className="text-2xl text-gray-500 md:text-3xl">
          <motion.span>{secondaryText}</motion.span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Hero;
