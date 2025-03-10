import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import InputField from "@components/Input";
import AlertMessage from "@pages/errorPages/AlertMessage";
import { paths } from "@routes/paths";
import useAuthStore from "@store/authStore";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {logout } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    errorMessage: "",
    successMessage: "",
  });

  const [userData, setUserData] = useState({
    existingPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate inputs
    if (!userData.existingPassword || !userData.newPassword || !userData.confirmNewPassword) {
      setMessage({ errorMessage: "All fields are required", successMessage: "" });
      setIsLoading(false);
      return;
    }

    if (userData.newPassword !== userData.confirmNewPassword) {
      setMessage({ errorMessage: "New passwords do not match", successMessage: "" });
      setIsLoading(false);
      return;
    }

    if (userData.newPassword.length < 6) {
      setMessage({ errorMessage: "New password must be at least 6 characters long", successMessage: "" });
      setIsLoading(false);
      return;
    }

    const data = {
      existingPassword: userData.existingPassword,
      newPassword: userData.newPassword,
    };

    try {
      await apiClient.put(`${endpoints.UpdateUserPassword}/${id}`, data);

      setMessage({
        errorMessage: "",
        successMessage: "Password updated successfully!, Logging you out...",
      });

      // Clear form fields
      setUserData({
        existingPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      
      setTimeout(()=>{
       
        logout(navigate)

      },3000)
      


    } catch (error) {
      setMessage({
        errorMessage: error?.response?.data?.message || "An error occurred. Please try again.",
        successMessage: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(paths.AdminDashboard);
    }
  };

  return (
    <div className="">
        <FaArrowLeftLong
        onClick={handleGoBack}
        className="cursor-pointer text-2xl text-neutral-400 mb-2 lg:hidden "
      />
  
    <div className="mt-5 w-full md:w-[80%] lg:w-[70%] mx-auto">
    
      <form onSubmit={handleSubmit} className="mb-10">
        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-4">
          <div className="w-full bg-white border border-gray-200 p-5 flex-[2]">
            <AlertMessage alert={message} />
            <h3 className="text-center text-accent uppercase mb-6">
              Update Password 
            </h3>
            <div className="flex flex-col gap-3">
              <InputField
                label="Current Password"
                name="existingPassword"
                type="password"
                value={userData.existingPassword}
                onChange={handleInputChange}
              />
              <InputField
                label="New Password"
                name="newPassword"
                type="password"
                value={userData.newPassword}
                onChange={handleInputChange}
              />
              <InputField
               label="Confirm New Password"
                name="confirmNewPassword"
                type="password"
                value={userData.confirmNewPassword}
                onChange={handleInputChange}
              />
            </div>
            <span className="text-yellow-500 text-xs italic">(⚠ This action will log you out.)</span>
          </div>
        </div>

        {/* Button Section */}
        <div className="w-full mt-5">
          <button
            type="submit"
            className="btn btn-primary bg-blue-500 py-2 rounded-sm mx-auto"
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default UpdatePassword;