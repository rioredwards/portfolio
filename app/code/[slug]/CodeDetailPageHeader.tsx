interface Props {
  title: string;
}

const CodeDetailPageHeader: React.FC<Props> = ({ title }) => {
  return <h1 className="font-bold text-4xl text-gray-600 mb-1 whitespace-nowrap mr-6">{title}</h1>;
};

export default CodeDetailPageHeader;
