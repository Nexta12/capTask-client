const EnhancedSelect = ({
  value,
  onChange,
  placeholder,
  name,
  id,
  error,
  options = [],
  ...rest
}) => {
  return (
    <label htmlFor={id} className="block text-u-xs relative">
      <select
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="w-full bg-white text-xs border-gray py-2xs text-dark focus:ring-0 px-4 py-2 border rounded-sm focus:outline-none focus:ring-accent h-10 peer"
        {...rest}
      >
        <option value="" disabled>
          Select One
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <span
        className={`pointer-events-none absolute top-0 -translate-y-1/2 bg-white text-xs transition-all p-0.5 start-2.5 text-dark ${
          value ? "top-0" : "top-1/2"
        } peer-focus:top-0`}
      >
        {placeholder}
      </span>
      {error && <div className="text-sm text-red-500 mt-1">{error}</div>}
    </label>
  );
};

export default EnhancedSelect;
