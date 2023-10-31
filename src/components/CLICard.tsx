interface Props {
  title: string;
  children: React.ReactNode;
}

const CLICard: React.FC<Props> = ({ title, children }) => {
  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-start px-4 py-4 hover:border-8 border-gray-400 hover:py-2 rounded-4xl">
        <h3 className="text-xl font-bold text-gray-500 group-hover:text-green-400 whitespace-nowrap">
          {title}
        </h3>
        {children}
        <pre className="w-full pl-8 absolute top-44 text-6xl font-black text-white leading-12 group-hover:text-green-400">
          {'>_'}
        </pre>
      </div>
    </>
  );
};

export default CLICard;
