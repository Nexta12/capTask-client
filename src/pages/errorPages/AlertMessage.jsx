import { useEffect, useState } from "react";

const AlertMessage = ({ alert }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (alert.errorMessage || alert.successMessage) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 20000); // Auto-hide after 3 sec
      return () => clearTimeout(timer);
    }
  }, [alert]);

  if (!visible) return null;

  return (
    <div
      className={`flex items-center p-3 mb-3 rounded-lg border shadow-md text-center
      ${alert.errorMessage ? "bg-red-100 border-red-500 text-red-700" : "bg-green-100 border-green-500 text-green-700"}`}
    >
      <span >{alert.errorMessage || alert.successMessage}</span>
      <button
        className="ml-auto px-2 py-1 text-gray-700 hover:text-gray-900"
        onClick={() => setVisible(false)}
      >
        ✕
      </button>
    </div>
  );
};

export default AlertMessage;
