import Footer from "@components/Footer";
import Header from "@components/Header";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  const bubbleColors = [
    "bg-red-500", // Red
    "bg-blue-500", // Blue
    "bg-green-500", // Green
    "bg-yellow-500", // Yellow
    "bg-purple-500", // Purple
    "bg-pink-500", // Pink
    "bg-indigo-500", // Indigo
    "bg-teal-500", // Teal
  ];
  return (
    <div className="overflow-hidden" >
       {/* Bubbles */}
       <div className="absolute inset-0 z-10 overflow-hidden">
        {Array.from({ length: 40 }).map((_, index) => {
          const randomColor =
            bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
          return (
            <div
              key={index}
              className={`bubble absolute bottom-0 w-4 h-4 rounded-full opacity-50 animate-bubble ${randomColor}`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 5 + 5}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          );
        })}
      </div>
      <Header />
       <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;
