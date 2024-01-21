interface Props {
  name?: string;
  children: React.ReactNode;
}

const CodeDetailSection: React.FC<Props> = ({ name, children }) => {
  return (
    <div className="mb-4">
      {name && (
        <div className="flex flex-col justify-center mb-3 mt-4">
          <h2 className="font-bold text-2xl text-gray-600 mb-1">{name}</h2>
          <div className="w-full h-[1px] bg-gray-300" />
        </div>
      )}
      {children}
    </div>
  );
};

export default CodeDetailSection;
