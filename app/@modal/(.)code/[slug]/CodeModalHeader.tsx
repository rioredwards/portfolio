'use client';

interface Props {
  title: string;
}

const CodeModalHeader: React.FC<Props> = ({ title }) => {
  return (
    <h1
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'instant',
        });
        window.location.reload();
      }}
      className="cursor-pointer hover:text-sky-400 font-bold text-4xl text-gray-600 whitespace-nowrap mr-6"
    >
      {title}
    </h1>
  );
};

export default CodeModalHeader;
