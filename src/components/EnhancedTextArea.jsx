
import { useRef, useEffect } from 'react';

const EnhancedTextArea = ({
  value,
  onChange,
  placeholder,
  name,
  error,
  rows = 4,
  ...rest
}) => {
  const textareaRef = useRef(null);

  // Function to adjust the height of the textarea
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height to auto to recalculate
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to scrollHeight
    }
  };

  // Adjust height whenever the value changes
  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  return (
    <div className="mb-8">
      <label
        htmlFor={name}
        className="relative block border text-sm rounded-[3px] border-gray focus-within:border-green"
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          id={name}
          rows={rows}
          className="mt-2 w-full border-0 align-top font-medium peer placeholder:text-dark focus:outline-none focus:ring-0 focus:ring-accent sm:text-sm p-2 text-black/70 resize-none overflow-hidden"
          {...rest}
        ></textarea>
        <span className="pointer-events-none absolute top-0 peer-focus:top-0 -translate-y-1/2 bg-white text-sm peer-placeholder-shown:text-xs peer-focus:text-sm text-primary transition-all start-2.5 p-0.5 peer-placeholder-shown:top-[15%] capitalize ">
          {name}
        </span>
      </label>
      {error && <div className="text-sm text-red-500 mt-1">{error}</div>}
    </div>
  );
};

export default EnhancedTextArea;
