import HoverGradient from './HoverGradient';

interface Props {
  title: string;
  children: React.ReactNode;
  color: string;
  isHover: boolean;
}

const WebsiteCard: React.FC<Props> = ({ title, children, color, isHover }) => {
  return (
    <>
      <div className="z-10 w-full h-16 group-hover:bg-gray-100 flex items-center px-8 gap-3 group-hover:border-b-2">
        <div className="h-full w-28 flex items-center justify-between">
          <div className="h-8 w-8 rounded-full group-hover:h-7 group-hover:w-7 bg-white group-hover:bg-gradient-to-br group-hover:from-red-200 group-hover:to-red-400" />
          <div className="h-8 w-8 rounded-full group-hover:h-7 group-hover:w-7 bg-white group-hover:bg-gradient-to-br group-hover:from-yellow-200 group-hover:to-yellow-400" />
          <div className="h-8 w-8 rounded-full group-hover:h-7 group-hover:w-7 bg-white group-hover:bg-gradient-to-br group-hover:from-green-200 group-hover:to-green-400" />
        </div>
        <div className="flex items-center grow bg-white h-8 rounded-md px-2">
          <h3 className="text-xl font-bold text-gray-500 whitespace-nowrap">{title}</h3>
        </div>
      </div>
      {children}
      {isHover && (
        <HoverGradient
          radius={500}
          key={title + 'gradient'}
          color={color}
          classes="w-full h-full rounded-4xl"
        />
      )}
    </>
  );
};

export default WebsiteCard;
