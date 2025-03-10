import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import DeleteModal from "@components/DeleteModal";
import FormModal from "@components/FormModal";
import ReadMoreModal from "@components/ReadMoreModal";
import Table from "@components/Table";
import ErrorAlert from "@pages/errorPages/errorAlert";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { paths } from "@routes/paths";
import useAuthStore from "@store/authStore";
import { UserRole } from "@utils/constants";
import { totalDepartments } from "@utils/data";
import { getNestedValue } from "@utils/helpers";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeftLong, FaEllipsisVertical } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { BsDownload } from "react-icons/bs";

const AllTasks = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [visiblePopup, setVisiblePopup] = useState(null);
  const popupRef = useRef(null);
  const { user } = useAuthStore();

  const [openModal, setOpenModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [openReadMore, setOpenReadMore] = useState(false);
  const [readMoreValue, setReadMoreValue] = useState(false);
  const [actionTitle, setActionTitle] = useState("");
  const [message, setMessage] = useState({
    errorMessage: "",
    successMessage: "",
  });

  // Filters state
  const [filters, setFilters] = useState({
    department: "",
    employeeName: "",
    startDate: "",
    endDate: "",
  });

  // Choose what to Export
  const [exportData, setExportData] = useState("allTasks");

  const downloadPDF = async () => {
    try {
      const downloadUrl = `${import.meta.env.VITE_API_BASE_URL}${
        exportData !== "allTasks"
          ? endpoints.exportAllTodayTaskToPDF
          : endpoints.exportAllTaskToPDF
      }`;

      const response = await apiClient.get(downloadUrl, {
        responseType: "blob", // Ensure the response is treated as a binary file
      });

      // Trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "tasks.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch {
      setError("No tasks to export ");
    }
  };

  const downloadExcel = async () => {
    try {
      const downloadUrl = `${import.meta.env.VITE_API_BASE_URL}${
        exportData !== "allTasks"
          ? endpoints.exportTodayTasksToExcel
          : endpoints.exportAllTasksToExcel
      }`;
      const response = await apiClient.get(downloadUrl, {
        responseType: "blob", // Ensure the response is treated as a binary file
      });
      // Trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "Tasks.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch {
      setError("No tasks to export ");
    }
  };

  const handleDelete = (value) => {
    setOpenModal(true);
    setItemToDelete(value);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        // Make an API call to delete the item
        await apiClient.delete(`${endpoints.deleteTask}/${itemToDelete}`);

        // Remove the item from the list
        setData((prev) => prev.filter((task) => task._id !== itemToDelete));

        setOpenModal(false); // Close the modal
        setItemToDelete(null); // Reset the item to delete
      } catch (error) {
        setError(ErrorFormatter(error));
        setOpenModal(false); // Close the modal
        setItemToDelete(null); // Reset the item to delete
      }
    }
  };

  const togglePopup = (_id) => {
    setVisiblePopup((prev) => (prev === _id ? null : _id));
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setVisiblePopup(null); // Dismiss popup
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const keyExtractor = (row) => row._id;

  const takeAction = (title, id) => {
    setActionTitle(title);
    setTaskToUpdate(id);
    setIsFormModalOpen(true);
  };

  const handleReadMore = (value) => {
    setOpenReadMore(true);
    setReadMoreValue(value);
  };

  const columns = [
    {
      key: "title",
      header: "Title",
      render: (value, row) => (
        <Link
          to={`${paths.Tasks}/view/${row._id}`}
          className={`hover:underline block max-w-[200px] truncate text-blue-600`}
          title={value} // Shows full text on hover
        >
          {value.length > 15 ? `${value.slice(0, 20)}...` : value}
        </Link>
      ),
    },

    {
      key: "contactInfo.fullName",
      header: "Employee",
      className: "capitalize",
      render: (_, row) =>
        `${getNestedValue(row, "employee.firstName")} ${getNestedValue(
          row,
          "employee.lastName"
        )}`,
    },
    {
      key: "employee.department",
      header: "Department",
      className: "whitespace-nowrap capitalize",
      render: (_, row) => `${getNestedValue(row, "employee.department")}`,
    },
    { key: "createdAt", header: "Date", className: " whitespace-nowrap" },
    { key: "hoursWorked", header: "Hours Worked" },
    {
      key: "remarkBy.fullName",
      header: "Reviewed By",
      className: "capitalize",
      render: (_, row) =>
        `${getNestedValue(row, "remarkBy.firstName")} ${
          getNestedValue(row, "remarkBy.lastName") || "-"
        }`,
    },

    {
      key: "status",
      header: "Status",
      render: (value, row) => {
        if (typeof value === "string") {
          // Determine the styles based on the value
          let bgClass = "";
          let textClass = "";
          switch (value) {
            case "Approved":
              bgClass = "bg-green-100";
              textClass = "text-green-800 capitalize text-[12px] ";
              break;
            case "Pending":
              bgClass = "bg-yellow-100";
              textClass = "text-yellow-800 capitalize text-[12px] ";
              break;
            case "Rejected":
              bgClass = "bg-red-100";
              textClass = "text-red-800 capitalize text-[12px] ";
              break;
            default:
              // Fallback for unexpected values
              bgClass = "bg-gray-100";
              textClass = "text-gray-800";
          }

          return (
            <div className="flex items-center space-x-3">
              <span
                className={`px-2 py-1 rounded text-sm font-medium ${bgClass} ${textClass}`}
              >
                {value}
              </span>
              {(user.role === UserRole.MANAGER || user.role === UserRole.ICT) &&
                value === "Pending" && (
                  <>
                    <button
                      onClick={() => takeAction("Approving", row._id)}
                      className="text-blue-500 hover:text-blue-700 text-sm underline focus:outline-none shadow-2xl "
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => takeAction("Declining", row._id)}
                      className="text-blue-500 hover:text-blue-700 text-sm underline focus:outline-none shadow-2xl "
                    >
                      Decline
                    </button>
                  </>
                )}
            </div>
          );
        }

        // Fallback for unexpected types
        return null;
      },
    },
    {
      key: "remark",
      header: "Comment",
      render: (value, row) => (
        <button
          id={row._id}
          onClick={() => handleReadMore(value)}
          className="text-blue-500 hover:underline capitalize"
        >
          {value
            ? value.length > 15
              ? `${value.slice(0, 15)}...`
              : value
            : "-"}
        </button>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: `${user.role === UserRole.ADMIN ? "hidden" : ""}`,
      render: (_, row) => (
        <div className="relative flex items-center justify-center">
          <FaEllipsisVertical
            className="cursor-pointer"
            onClick={() => togglePopup(row._id)}
          />

          {visiblePopup === row._id && (
            <div
              ref={popupRef}
              className="absolute bg-white border rounded shadow p-2 top-[-4px] right-0 z-10 flex items-center gap-3"
            >
              <Link
                to={`${paths.Tasks}/view/${row._id}`}
                className="whitespace-nowrap"
              >
                View
              </Link>
              <button
                onClick={() => handleDelete(row._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // Pagination
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(endpoints.getAllTasks, {
          params: {
            department: filters.department,
            employeeName: filters.employeeName,
            startDate: filters.startDate,
            endDate: filters.endDate,
            page: currentPage,
            pageSize: pageSize,
          },
        });
        setData(response.data.data.data);
        setTotalPages(response.data.data.totalPages);
        setError(null);
      } catch (error) {
        setError(ErrorFormatter(error));
      }
    };

    fetchData();
  }, [filters, currentPage, pageSize]); // Dependencies for fetchData

  // Debounced function for employee name filter
  const handleEmployeeNameChange = debounce((value) => {
    setFilters((prev) => ({ ...prev, employeeName: value }));
  }, 300);

  const navigate = useNavigate();
  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(paths.AdminDashboard);
    }
  };

  const handleFormSubmit = async (formData) => {
    const data = {
      ...formData,
      status: actionTitle === "Approving" ? "Approved" : "Rejected",
    };

    try {
      await apiClient.put(`${endpoints.approveTask}/${taskToUpdate}`, data);
      setMessage({
        errorMessage: "",
        successMessage: `Task ${
          actionTitle === "Approving" ? "Approved" : "Declined"
        } Successfully`,
      });
      setTimeout(() => {
        setIsFormModalOpen(false); // Close the modal first
        setTimeout(() => {
          window.location.reload(); // Reload only after modal has disappeared
        }, 500); // Add a slight delay to ensure UI updates before reloading
      }, 3000);
    } catch (error) {
      setMessage({ errorMessage: ErrorFormatter(error), successMessage: "" });
    }
  };

  const fields = [{ name: "remark", type: "textarea", required: true }];

  return (
    <div>
      <FaArrowLeftLong
        onClick={() => handleGoBack()}
        className="cursor-pointer text-2xl text-neutral-400 lg:hidden "
      />
      <DeleteModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={confirmDelete}
        message={"Are you Sure You want to this item ?"}
      />
      <ReadMoreModal
        isOpen={openReadMore}
        onClose={() => setOpenReadMore(false)}
        message={readMoreValue}
      />

      <FormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        title={`Remark for ${actionTitle} Task`}
        fields={fields}
        alertMsg={message}
      />

      {/* Render ErrorAlert if there's an error */}
      {error && <ErrorAlert message={error} />}

      <div className="my-4 w-full flex flex-col gap-y-4 lg:flex-row items-center justify-between  ">
        <div className="flex items-center gap-1">
          <h1 className="text-primary tracking-[1px] whitespace-nowrap">
            Export
          </h1>
          <select
            value={exportData}
            onChange={(e) => setExportData(e.target.value)}
            className="px-3 py-2 border rounded"
          >
            <option value="allTasks">All Tasks</option>
            <option value="todayTasks">Today Task</option>
          </select>

          <button
            onClick={downloadPDF}
            className="flex items-center gap-x-1 mr-2 text-red-500"
            title={`Export ${exportData} to PDF`}
          >
            <BsDownload />
            PDF
          </button>

          <button
            onClick={downloadExcel}
            className="flex items-center gap-x-1 text-green-500"
            title={`Export ${exportData} to Excel`}
          >
            <BsDownload />
            Excel
          </button>
        </div>

        <div className="flex items-center gap-3 text-sm overflow-x-auto px-3 w-full lg:w-auto ">
          <h4 className="text-sm">Filters</h4>
          {/* Department Filter */}

          <select
            value={filters.department}
            onChange={(e) =>
              setFilters({ ...filters, department: e.target.value })
            }
            className="px-3 py-2 border rounded"
          >
            <option value="">All Departments</option>
            {totalDepartments.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Employee Name Filter */}
          <input
            type="text"
            onChange={(e) => handleEmployeeNameChange(e.target.value)}
            className="px-3 py-2 border rounded"
            placeholder="Employee Name"
          />

          {/* Start Date Filter */}
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value })
            }
            className="px-3 py-2 border rounded"
            placeholder="Start Date"
          />

          {/* End Date Filter */}
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value })
            }
            className="px-3 py-2 border rounded"
            placeholder="End Date"
          />
        </div>

        {/* Table */}
      </div>
      {/* Table */}
      <Table
        data={data}
        columns={columns}
        keyExtractor={keyExtractor}
        currentPage={currentPage}
        totalPages={totalPages} // Total pages for pagination
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default AllTasks;
