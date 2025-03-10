const EnhancedInput = ({
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  error,
  className,
  ...rest
}) => {
  return (
    <div className="mb-4 w-full">
      <label
        htmlFor={name}
        className="relative block border rounded-[3px] border-gray focus-within:border-green"
      >
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          id={name}
          className={`border-none bg-transparent peer placeholder-transparent  w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-0 focus:ring-accent ${className}`}
          {...rest}
        />
        <span className="pointer-events-none absolute top-0 peer-focus:top-0 peer-placeholder-shown:top-1/2 -translate-y-1/2 bg-white text-sm peer-placeholder-shown:text-sm peer-focus:text-xs transition-all start-2.5 p-0.5  text-primary">
          {placeholder}
        </span>
      </label>
      {error && <div className="text-sm text-red-500 mt-1">{error}</div>}
    </div>
  );
};

export default EnhancedInput;
