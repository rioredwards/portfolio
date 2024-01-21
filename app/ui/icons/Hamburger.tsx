import { Cycle, motion } from 'framer-motion';

interface Props {
  toggle: Cycle;
}

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="#71717a"
    strokeLinecap="round"
    {...props}
  />
);

const Hamburger: React.FC<Props> = ({ toggle }) => {
  return (
    <button
      onClick={toggle as any}
      className="z-40 w-16 outline-none cursor-pointer flex justify-center items-center rounded-full"
    >
      <svg viewBox="0 0 23 23" className="w-8 h-8 translate-y-[2px] translate-x-[1px]">
        <Path
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
        />
      </svg>
    </button>
  );
};

export default Hamburger;
