
const HeroSlider = () => {

  return (
    <div className="h-screen bg-black relative overflow-hidden">
    
      {/* Your Content */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center">
          <h2 className="text-white text-tertiary uppercase mb-5 text-lg md:text-xl lg:text-4xl">Your One Spot</h2>
          <h3 className="h3 m-auto text-sky-500 text-2xl md:text-3xl lg:text-6xl">TASK MANAGEMENT SOLUTION</h3>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
