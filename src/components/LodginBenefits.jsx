import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdFormatListBulleted } from "react-icons/md";

const LodginBenefits = () => {
  const settings = {
    infinite: true,
    vertical: true,
    speed: 3000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  const Benefits = [
    {
      title: "Perform Your daily duties",
    },
    {
      title: "Enter a summary of your daily tasks",
    },
    {
      title: "Do not forget to mention hours worked",
    },
    {
      title: "Submit the task with a clear title",
    },
    {
      title: "Remember the description of tasks is vital",
    },
    {
      title: "Submit the tasks and wait for review",
    },
    {
      title: "Review can be positive or negative",
    },
    {
      title: "Thank you for staying behind",
    },
    {
      title: "You can always check your dashboard",
    },
  ];

  return (
    <div className="w-full lg:w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col ">
      <h3 className=" text-center text-secondary text-lg font-semibold mb-4 tracking-[2px]">
        Daily Checklists
      </h3>

      <Slider {...settings} className="w-full">
        {Benefits.map((benefit, index) => (
          <div key={index} className="">
          <div  className="flex items-center gap-x-2 text-sm mb-4">
            <MdFormatListBulleted className="" />
            <span>{benefit.title}</span>
          </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LodginBenefits;
