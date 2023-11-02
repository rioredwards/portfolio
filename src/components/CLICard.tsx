import HoverGradient from './HoverGradient';

interface Props {
  title: string;
  isHover: boolean;
  color: string;
  children: React.ReactNode;
}

const CLICard: React.FC<Props> = ({ title, children, isHover, color }) => {
  return (
    <>
      <div className="pointer-events-none z-10 w-full h-full flex flex-col items-center justify-start px-4 py-4 group-hover:border-8 border-gray-400 hover:py-2 rounded-4xl">
        <h3 className="pointer-events-none z-10 text-xl font-bold text-gray-500 group-hover:-mt-2 whitespace-nowrap">
          {title}
        </h3>
        {children}
        <pre className="pointer-events-none z-10 w-full pl-8 absolute top-44 text-6xl font-black text-white leading-12 group-hover:text-green-400">
          {'>_'}
        </pre>
      </div>
    </>
  );
};

export default CLICard;
