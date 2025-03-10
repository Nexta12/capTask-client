

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// export default InputField;

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  error,
  ...rest
}) => {
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Determine the input type
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType} // Dynamic input type
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          id={name}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          {...rest}
        />
        {/* Show/hide password toggle button */}
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 px-3 flex items-center text-sm leading-5"
          >
            {showPassword ? (
              <FaEyeSlash className="text-gray-500 text-md " /> // Icon for visible password
            ) : (
              <FaEye className="text-gray-500 text-md " /> // Icon for hidden password
            )}
          </button>
        )}
      </div>
      {error && <div className="text-sm text-red-500 mt-1">{error}</div>}
    </div>
  );
};

export default InputField;
