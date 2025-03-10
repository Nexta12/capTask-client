import InputField from "@components/Input";
import { useEffect, useState } from "react";
import AlertMessage from "@pages/errorPages/AlertMessage"; // Assuming you have an AlertMessage component
import { apiClient } from "@api/apiClient";
import { getLocalStorageItem, removeLocalStorageItem } from "@utils/localStorage";
import { endpoints } from "@api/endpoints";
import { useNavigate } from "react-router-dom";
import { paths } from "@routes/paths";


const NewPassword = () => {
  const [values, setValues] = useState({ password: "", confirmPassword: "" });
  const [message, setMessage] = useState({ errorMessage: "", successMessage: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

    const [email, setEmail] = useState("");
  
    useEffect(() => {
      const email = getLocalStorageItem("otpEmail");
  
      setEmail(email);
  
      setLoading(false);
    }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ errorMessage: "", successMessage: "" }); // Reset messages

    // Validate passwords
    if (values.password !== values.confirmPassword) {
      setLoading(false);
      return setMessage({ errorMessage: "Passwords do not match", successMessage: "" });
    }

    // Validate password strength (optional)
    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!(values.password)) {
      setLoading(false);
      return setMessage({
        errorMessage: "Provide password",
        successMessage: "",
      });
    }

    // Prepare data for API request
    const data = {
      password: values.password,
      confirmPassword: values.confirmPassword,
      email
    };

    try {
      // Call your API to update the password
      // Example:
      await apiClient.post(endpoints.ResetPassword, data);
    
      setMessage({ errorMessage: "", successMessage: "Password updated successfully!" });
      // Simulate API call for demonstration
      removeLocalStorageItem("otpEmail");
      setValues({
        password: "",
        confirmPassword: ""
      })
      setTimeout(() => {
        setLoading(false);
        navigate(paths.Login)
      }, 3000);
    } catch (error) {
      console.error(error);
      setMessage({ errorMessage: "Failed to update password. Please try again.", successMessage: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="">
      <div className="bg-black h-screen relative flex justify-center items-center ">
        {/* Overlay */}
        <div className="absolute w-full h-full bg-black/50"></div>
        {/* Title */}
        <div className="z-20 w-[80%] lg:w-[40%] bg-sky-600 p-5 rounded-md shadow-2xl">
          <h3 className="h3 text-white flex items-center gap-x-2 justify-center">
            New Password
          </h3>
          <form onSubmit={handleSubmit}>
            {/* Display error or success messages */}
            <AlertMessage alert={message} />

            {/* Password Field */}
            <InputField
              placeholder="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              autoFocus
            />

            {/* Confirm Password Field */}
            <InputField
              placeholder="Confirm Password"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-secondary hover:bg-black/65 w-full py-2 rounded-sm mb-4"
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <>
                  <span>Updating...</span>
                  <span className="animate-spin">🌀</span>{" "}
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewPassword;