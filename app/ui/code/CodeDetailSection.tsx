interface Props {
  name?: string;
  children: React.ReactNode;
}

const CodeDetailSection: React.FC<Props> = ({ name, children }) => {
  return (
    <div className="mb-4">
      {name && (
        <div className="flex justify-center mb-2 mt-4">
          <h2 className="font-bold text-2xl text-gray-600 mb-1">{name}</h2>
        </div>
      )}
      {children}
    </div>
  );
};

export default CodeDetailSection;
