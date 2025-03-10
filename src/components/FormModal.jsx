import AlertMessage from "@pages/errorPages/AlertMessage";
import { useState } from "react";

const FormModal = ({ isOpen, onClose, onSubmit, title, fields, alertMsg, initialData = {} }) => {
  const [formData, setFormData] = useState(initialData);
 
  if (!isOpen) return null; // Don't render the modal if it's not open

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass the form data to the parent component
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60"
      aria-hidden={!isOpen}
      role="dialog"
    >
      <div className="bg-white p-6 rounded-md w-[90%] md:w-[70%] lg:w-[50%]">
         <AlertMessage alert={alertMsg}/>
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  rows={4}
                  required={field.required}
                />
              ) : (
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  required={field.required}
                />
              )}
            </div>
          ))}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-gray-500 text-white py-1 px-4 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-accent text-white py-1 px-4 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;