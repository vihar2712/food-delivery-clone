const HomeShimmer = () => {
  return (
    <div>
      <div className="flex p-4 justify-center text-lg animate-pulse">
        <div className="p-4 rounded-md mx-2 w-3/12 bg-slate-400"></div>
        <button className="px-4 bg-slate-400 rounded-md ml-1"></button>
        <button className=" bg-slate-400 rounded-md mx-3 px-4"></button>
        <button className=" bg-slate-400 rounded-md px-4"></button>
      </div>
      <div className="grid grid-cols-12 mx-10 sm:mx-16 md:mx-20 lg:mx-24 xl:mx-32 gap-6 animate-pulse">
        <div className="mr-4 col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 bg-slate-400 w-full sm:w-[1/2] md:w-[1/3] lg:w-[1/4] h-[250px] rounded-md"></div>
        <div className="mr-4 col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 bg-slate-400 w-full sm:w-[1/2] md:w-[1/3] lg:w-[1/4] h-[250px] rounded-md"></div>
        <div className="mr-4 col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 bg-slate-400 w-full sm:w-[1/2] md:w-[1/3] lg:w-[1/4] h-[250px] rounded-md"></div>
        <div className="mr-4 col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 bg-slate-400 w-full sm:w-[1/2] md:w-[1/3] lg:w-[1/4] h-[250px] rounded-md"></div>
        <div className="mr-4 col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 bg-slate-400 w-full sm:w-[1/2] md:w-[1/3] lg:w-[1/4] h-[250px] rounded-md"></div>
        <div className="mr-4 col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 bg-slate-400 w-full sm:w-[1/2] md:w-[1/3] lg:w-[1/4] h-[250px] rounded-md"></div>
        <div className="mr-4 col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 bg-slate-400 w-full sm:w-[1/2] md:w-[1/3] lg:w-[1/4] h-[250px] rounded-md"></div>
        <div className="mr-4 col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 bg-slate-400 w-full sm:w-[1/2] md:w-[1/3] lg:w-[1/4] h-[250px] rounded-md"></div>
      </div>
    </div>
  );
};

export default HomeShimmer;
