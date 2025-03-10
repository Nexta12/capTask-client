import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";

import EnhancedInput from "@components/EnhancedInput";
import EnhancedTextArea from "@components/EnhancedTextArea";
import AlertMessage from "@pages/errorPages/AlertMessage";
import ErrorAlert from "@pages/errorPages/errorAlert";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { paths } from "@routes/paths";
import { scrollUP } from "@utils/helpers";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTask = () => {
  const { id } = useParams();

  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    errorMessage: "",
    successMessage: "",
  });

  const [taskData, setTaskData] = useState({
    title: "",
    hoursWorked: "",
    description: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(
          `${endpoints.getTaskDetails}/${id}`
        );

        setTaskData(response.data.data);
      } catch (error) {
        setError(ErrorFormatter(error));
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskDetails = {
      title: taskData.title ,
      hoursWorked: taskData.hoursWorked,
      description: taskData.description
    };

    setIsLoading(true);

    try {
      await apiClient.put(`${endpoints.updateTask}/${id}`, taskDetails);
      // Reset form data
      setMessage({
        errorMessage: "",
        successMessage: "Task updated successfully",
      });
      scrollUP();
    } catch (error) {
      setMessage({ errorMessage: ErrorFormatter(error), successMessage: "" });
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
    <div className="mt-5 w-full md:w-[80%] lg:w-[70%] mx-auto pb-10">
        <FaArrowLeftLong
                onClick={() => handleGoBack()}
                className="cursor-pointer text-2xl text-neutral-400 mb-2 lg:hidden "
              />
      {/* Render ErrorAlert if there's an error */}
      {error && <ErrorAlert message={error} />}
      <form className="mb-10" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-4">
          <div className="Left w-full bg-white border border-gray-200 p-5 flex-[2]">
         
            <AlertMessage alert={message} />
            <h3 className="text-center text-accent font-semibold uppercase mb-10">
              Update Task
            </h3>
            <div className="flex flex-col gap-y-4">
              <EnhancedInput
                name="title"
                type="text"
                id="title"
                placeholder="Title*"
                onChange={handleInputChange}
                value={taskData.title}
                required
              />
              <EnhancedInput
                name="hoursWorked"
                type="number"
                id="hoursWorked"
                placeholder="Hours Worked*"
                onChange={handleInputChange}
                value={taskData.hoursWorked}
                required
              />
              <EnhancedTextArea
                value={taskData.description}
                name="description"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="w-full mt-5">
          <button
            type="submit"
            className="btn btn-primary bg-blue-500 py-2 rounded-sm mx-auto"
          >
            {isLoading ? "Please wait..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;
