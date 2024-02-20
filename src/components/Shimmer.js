const HomeShimmer = () => {
  return (
    <div>
      <div className="flex p-4 justify-center text-lg">
        <div className="p-4 rounded-md mx-2 w-3/12 bg-gray-200"></div>
        <button className="px-4 bg-gray-100 rounded-md ml-1 mr-3"></button>
        <button className=" bg-gray-100 rounded-md px-4"></button>
      </div>
      <div className="flex flex-wrap ml-16" data-testid="resCard">
        <div className="bg-gray-200 w-[230px] h-[230px] m-1 rounded-md mt-3"></div>
        <div className="bg-gray-200 w-[230px] h-[230px] m-1 rounded-md mt-3"></div>
        <div className="bg-gray-200 w-[230px] h-[230px] m-1 rounded-md mt-3"></div>
        <div className="bg-gray-200 w-[230px] h-[230px] m-1 rounded-md mt-3"></div>
        <div className="bg-gray-200 w-[230px] h-[230px] m-1 rounded-md mt-3"></div>
        <div className="bg-gray-200 w-[230px] h-[230px] m-1 rounded-md mt-3"></div>
        <div className="bg-gray-200 w-[230px] h-[230px] m-1 rounded-md mt-3"></div>
        <div className="bg-gray-200 w-[230px] h-[230px] m-1 rounded-md mt-3"></div>
        <div className="bg-gray-200 w-[230px] h-[230px] m-1 rounded-md mt-3"></div>
        <div className="bg-gray-200 w-[230px] h-[230px] m-1 rounded-md mt-3"></div>
      </div>
    </div>
  );
};

export default HomeShimmer;
