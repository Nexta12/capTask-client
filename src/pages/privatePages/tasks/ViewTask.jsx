
import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import Spinner from "@components/Spinner";
import ErrorAlert from "@pages/errorPages/errorAlert";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { paths } from "@routes/paths";
import useAuthStore from "@store/authStore";
import { DateFormatter } from "@utils/helpers";
import { useEffect, useState } from "react";
import { BsDownload, BsFileExcel, BsPencil } from "react-icons/bs";
import { FaArrowLeftLong } from "react-icons/fa6";
import {  Link, useNavigate, useParams } from "react-router-dom";

const  ViewTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
 const { user } = useAuthStore()
  const [taskDetails, setTaskDetails] = useState({});

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(paths.AdminDashboard);
    }
  };

  const downloadPdf = () => {
    try {
      const downloadUrl = `${import.meta.env.VITE_API_BASE_URL}${endpoints.downloadPdfFile}/${id}`;
      window.location.href = downloadUrl;
    } catch (error) {
      setError(ErrorFormatter(error))
    }
  };
  const downloadExcel = () => {
    try {
      const downloadUrl = `${import.meta.env.VITE_API_BASE_URL}${endpoints.downloadExcelFile}/${id}`;
      window.location.href = downloadUrl;
    } catch (error) {
      setError(ErrorFormatter(error))
    }
  };

  // Function to check if the task is older than 24 hours
  const isTaskOlderThan24Hours = (createdAt) => {
    if (!createdAt) return true; // If createdAt is missing, assume it's older

    const taskCreatedTime = new Date(createdAt).getTime(); // Convert createdAt to timestamp
    const currentTime = new Date().getTime(); // Get current timestamp
    const timeDifferenceInHours = (currentTime - taskCreatedTime) / (1000 * 60 * 60); // Difference in hours

    return timeDifferenceInHours > 24; // Return true if older than 24 hours
  };




  useEffect(() => {
    if (!id) return;

    const fetchTaskDetails = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(
          `${endpoints.getTaskDetails}/${id}`
        );
        setTaskDetails(response.data.data);
      } catch (error) {
        setError(ErrorFormatter(error));
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <div className="pb-16">
         <FaArrowLeftLong
          onClick={() => handleGoBack()}
          className="cursor-pointer text-neutral-400 lg:hidden"
        />
      {/* Render ErrorAlert if there's an error */}
      {error && <ErrorAlert message={error} />}

      <div className="bg-white w-full md:w-[80%]  mx-auto p-4 lg:p-10 border border-gray-300 ">
         <div className="w-full flex items-center lg:text-right justify-between text-sm">
            <button onClick={downloadPdf} className="flex items-center gap-2 text-red-500 hover:underline " title="Export to PDF" ><BsDownload/>PDF</button>

            <button onClick={downloadExcel} className="flex items-center gap-2 text-green-600 hover:underline " title="Export to Excel sheet" > <BsFileExcel/> Export Excel</button>

          {user.id === taskDetails.employee._id && (
            <>
            
        
            {isTaskOlderThan24Hours(taskDetails.createdAt) ? (
            <span
              className="flex items-center gap-2 text-gray-400 cursor-not-allowed"
              title="Edit Task (Disabled)"
            >
              <BsPencil /> Edit Task
            </span>
          ) : (
            <Link
              to={`${paths.StaffTasks}/edit/${id}`}
              className="flex items-center gap-2 text-blue-500 hover:underline"
              title="Edit Task"
            >
              <BsPencil /> Edit Task
            </Link>
          )}
              </>

             )}

         </div>
        <div className="">
          <div className="w-full mt-4 mb-4 border-b border-gray flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-tertiary font-semibold tracking-[1px]">
                Title
              </h3>
            </div>
            <div className="flex-[2] text-end ">
              <p className="text-md capitalize">
                {taskDetails.title}
              </p>
            </div>
          </div>

          <div className="w-full mb-4 border-b border-gray flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap">
                Submitted By
              </h3>
            </div>
            <div className="flex-[2] text-end ">
              <p className="text-md capitalize whitespace-nowrap">
                {taskDetails.employee.firstName} {taskDetails.employee.lastName}
              </p>
            </div>
          </div>

          <div className="w-full mb-4 border-b border-gray flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap">
                Hours Worked:
              </h3>
            </div>
            <div className="flex-[2] text-end ">
              <p className="text-md whitespace-nowrap">
                {taskDetails.hoursWorked}{" "}
              </p>
            </div>
          </div>
        

          <div className="w-full mb-4 border-b border-gray flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap">
                Date:
              </h3>
            </div>
            <div className="flex-[2] text-end ">
              <p className="text-md whitespace-nowrap">
                {DateFormatter(taskDetails.createdAt)}{" "}
              </p>
            </div>
          </div>
          <div className="w-full my-3 border-b border-gray  flex flex-col  justify-between">
            <div className="flex-1">
              <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap mb-3">
              Description:
              </h3>
            </div>

            <div className="flex-1">
               <p> {taskDetails.description}</p>
            </div>
          </div>
          <div className="w-full mb-4 border-b border-gray flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap">
                Supervised By
              </h3>
            </div>
            <div className="flex-[2] text-end ">
              <p className="text-md capitalize whitespace-nowrap">
                {taskDetails?.remarkBy?.firstName} {taskDetails?.remarkBy?.lastName}
              </p>
            </div>
          </div>
          <div className="w-full mb-4 border-b border-gray flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap">
                Status:
              </h3>
            </div>
            <div className="flex-[2] text-end flex justify-end">
              <p
                className={`text-md whitespace-nowrap p-2 ${
                  taskDetails.status === "Pending"
                    ? "text-yellow-500"
                    : taskDetails.status === "Approved"
                    ? "text-green-500"
                    : taskDetails.status === "Rejected"
                    ? "text-red-500"
                    : taskDetails.status === "completed"
                    ? "bg-blue-500"
                    : "bg-gray-500" // Fallback for unknown statuses
                }`}
              >
                {taskDetails.status === "completed"
                  ? "Active"
                  : taskDetails.status}
              </p>
            </div>
          </div>
          <div className="w-full mb-4 border-b border-gray flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap">
                Comment
              </h3>
            </div>
            <div className="flex-[2] text-end ">
              <p className="text-md capitalize">
                {taskDetails?.remark}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default  ViewTask;
