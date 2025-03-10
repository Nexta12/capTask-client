import { useEffect, useState } from "react";

const ErrorAlert = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-25 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-md  z-50 ">
      {message}
    </div>
  );
};

export default ErrorAlert;
