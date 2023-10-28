interface Props {}

const NewCodeCardContainer: React.FC<Props> = ({}) => {
  return (
    <div className="h-12 border-b-8 border-gray-300 flex items-center px-8">
      <div className="h-8 w-8 border-8 border-gray-300 rounded-full mr-2" />
      <div className="h-8 w-8 border-8 border-gray-300 rounded-full mr-2" />
      <div className="h-8 w-8 border-8 border-gray-300 rounded-full mr-2" />
    </div>
  );
};

export default NewCodeCardContainer;
