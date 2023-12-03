const WebsiteCardIcon = () => {
  return (
    <div className="flex-shrink-0 h-full w-[25%] flex items-center justify-between">
      {/* Red */}
      <div className="w-[30%]">
        <div className="relative w-full pt-[100%]">
          <div className="absolute top-0 left-0 right-0 bottom-0 m-auto rounded-full bg-white bg-gradient-to-br from-red-200 to-red-400" />
        </div>
      </div>
      {/* Yellow */}
      <div className="w-[30%]">
        <div className="relative w-full pt-[100%]">
          <div className="absolute top-0 left-0 right-0 bottom-0 m-auto rounded-full bg-white bg-gradient-to-br from-yellow-200 to-yellow-300" />
        </div>
      </div>
      {/* Green */}
      <div className="w-[30%]">
        <div className="relative w-full pt-[100%]">
          <div className="absolute top-0 left-0 right-0 bottom-0 m-auto rounded-full bg-white bg-gradient-to-br from-green-200 to-green-400" />
        </div>
      </div>
    </div>
  );
};

export default WebsiteCardIcon;
