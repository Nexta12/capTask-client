import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import EnhancedInput from "@components/EnhancedInput";
import EnhancedSelect from "@components/EnhancedSelect";
import EnhancedTextArea from "@components/EnhancedTextArea";
import AlertMessage from "@pages/errorPages/AlertMessage";
import ErrorAlert from "@pages/errorPages/errorAlert";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { paths } from "@routes/paths";
import useAuthStore from "@store/authStore";
import { UserRole } from "@utils/constants";
import { totalDepartments, totalPosition, totalTitles, totaluserRole } from "@utils/data";
import { scrollUP } from "@utils/helpers";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

const EditProfile = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    errorMessage: "",
    successMessage: "",
  });

  const roleLevels = {
    [UserRole.ICT]: 4,
    [UserRole.MANAGER]: 3,
    [UserRole.ADMIN]: 2,
    [UserRole.EMPLOYEE]: 1,
  };
  const getFilteredRoles = (currentUserRole) => {
    const currentUserLevel = roleLevels[currentUserRole];
    return totaluserRole.filter(
      (role) => roleLevels[role.value] <= currentUserLevel
    );
  };

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    position: "",
    description: "",
    password: "",
    phone: "",
    role: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get(
          `${endpoints.getUserDetails}/${id}`
        );

        setUserData(response.data.data);
      } catch (error) {
        setError(ErrorFormatter(error));
      }
    };

    fetchUserData();
  }, [id]);

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userDetails = {
      title: userData.title,
      firstName: userData.firstName,
      lastName: userData.lastName,
      department: userData.department,
      position: userData.position,
      description: userData.description,
      role: userData.role,
      phone: userData.phone,
      email: userData.email,
      address: userData.address,
    };

    try {
      await apiClient.put(`${endpoints.UpdateUser}/${id}`, userDetails);

      setMessage({
        errorMessage: "",
        successMessage: "User Updated Successfully",
      });

      //  Reset Everything all Inputs to empty including uploaded images after submission success

      scrollUP();
    } catch (error) {
      setMessage({ errorMessage: error?.response?.data, successMessage: "" });
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();
  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(paths.AdminDashboard);
    }
  };

  return (
    <div className="pb-10 lg:pb-0">
      {error && <ErrorAlert message={error} />}
      <FaArrowLeftLong
        onClick={() => handleGoBack()}
        className="cursor-pointer text-2xl text-neutral-400 lg:hidden"
      />

      <div className="mt-5 w-full md:w-[80%]  mx-auto ">
        <form action="" method="post" className="mb-10" onSubmit={handleSubmit}>
          <div className=" w-full  flex flex-col lg:flex-row items-start justify-between gap-4">
            <div className="Left w-full bg-white border border-gray-200 p-5 flex-[2] ">
              <AlertMessage alert={message} />
              <h3 className=" h3 text-center text-primary/85 uppercase mb-6">
                Update Profile
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="w-full !mt-[-15px]">
                  <EnhancedSelect
                    name="title"
                    id="title"
                    placeholder="Select Title*"
                    options={totalTitles}
                    value={userData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <EnhancedInput
                  name="firstName"
                  id="firstName"
                  placeholder="First Name*"
                  onChange={handleInputChange}
                  value={userData.firstName}
                  required
                />

                <EnhancedInput
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name*"
                  onChange={handleInputChange}
                  value={userData.lastName}
                  required
                />
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 mt-3">
                <EnhancedInput
                  name="email"
                  id="email"
                  placeholder="Email*"
                  onChange={handleInputChange}
                  value={userData.email}
                  required
                />
                <EnhancedInput
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  onChange={handleInputChange}
                  value={userData.phone}
                />
                <EnhancedInput
                  name="address"
                  id="address"
                  placeholder="Address"
                  onChange={handleInputChange}
                  value={userData.address}
                />
              </div>
            
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 my-3">
              {user.role !== UserRole.EMPLOYEE && (
                <div className="w-full !mt-[-15px]">
                  <EnhancedSelect
                    name="role"
                    id="role"
                    placeholder="Select Role*"
                    options={getFilteredRoles(user.role)}
                    value={userData.role}
                    onChange={handleInputChange}
                  />
                </div>
                    )}
                <div className="w-full !mt-[-15px]">
                  <EnhancedSelect
                    name="department"
                    id="department"
                    placeholder="Select Department*"
                    options={totalDepartments}
                    value={userData.department}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full !mt-[-15px]">
                  <EnhancedSelect
                    name="position"
                    id="position"
                    placeholder="Position"
                    options={totalPosition}
                    value={userData.position}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            
              <EnhancedTextArea
                name="description"
                id="description"
                onChange={handleInputChange}
                value={userData.description}
              />
            </div>
          </div>

          {/* Button Section */}
          <div className="w-full mt-5">
            <button
              type="submit"
              className="btn btn-primary bg-blue-500 py-2 rounded-sm mx-auto "
            >
              {isLoading ? "Please wait..." : "Update User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
