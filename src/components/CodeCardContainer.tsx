import { CodeCardType } from '@/lib/api';

interface Props {
  type: CodeCardType;
  children?: React.ReactNode;
}

const CodeCardContainer: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="w-full h-14 bg-slate-100 flex items-center px-8">
        <div className="h-8 w-8 rounded-full mr-2 group-hover:h-7 group-hover:w-7 group-hover:mr-3 bg-white group-hover:bg-red-300" />
        <div className="h-8 w-8 rounded-full mr-2 group-hover:h-7 group-hover:w-7 group-hover:mr-3 bg-white group-hover:bg-yellow-300" />
        <div className="h-8 w-8 rounded-full mr-2 group-hover:h-7 group-hover:w-7 group-hover:mr-3 bg-white group-hover:bg-green-300" />
      </div>
      {children}
    </>
  );
};

export default CodeCardContainer;
