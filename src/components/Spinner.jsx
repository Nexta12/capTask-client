const Spinner = () => {
    return (
      <div className=" w-screen h-screen flex items-center justify-center bg-gray-50 z-[9999] !overflow-x-hidden ">
        <div className="w-10 h-10 border-4 border-t-4 border-gray border-t-LightBlue rounded-full animate-spin"></div>
      </div>
    );
  };
  
  export default Spinner;