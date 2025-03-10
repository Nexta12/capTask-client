

import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import DeleteModal from "@components/DeleteModal";
import Table from "@components/Table";
import ErrorAlert from "@pages/errorPages/errorAlert";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { paths } from "@routes/paths";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeftLong, FaEllipsisVertical } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import userAvarter from '@assets/img/avater.png'
import { UserRole } from "@utils/constants";
import useAuthStore from "@store/authStore";

const AdminStaff = () => {
  const { user} = useAuthStore()
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [visiblePopup, setVisiblePopup] = useState(null);
  const popupRef = useRef(null);

  const [openModal, setOpenModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDelete = (value) => {
    setOpenModal(true);
    setItemToDelete(value);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        // Make an API call to delete the item
        await apiClient.delete(`${endpoints.deleteUser}/${itemToDelete}`);

        // Remove the item from the list
        setData((prev) => prev.filter((user) => user._id !== itemToDelete));

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

  const columns = [
    {
      key: "fullName",
      header: "Full Name",
      className: 'capitalize',
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <img 
            src={row.profilPic || userAvarter  } 
            alt={`${row.firstName} ${row.lastName}`} 
            className="w-8 h-8 rounded-full object-cover" 
          />
          <Link 
            to={`${paths.Users}/${row._id}`} 
            className="hover:underline block max-w-[200px] truncate text-blue-600"
          >
            {row.title} {row.firstName} {row.lastName}
          </Link>  
        </div>
      )
    },

   { key: "email", header: "Email"},
   { key: "department", header: "Department", className: "capitalize" },
   { key: "position", header: "Position", className: "capitalize" },
   { key: "role", header: "Role",  
     render: (value) => {
    if (typeof value === "string") {

      let bgClass = "";
      let textClass = "";
      switch (value) {
        case "Manager":
          bgClass = "bg-blue-100";
          textClass = "text-blue-800 capitalize text-[12px] ";
          break;
        case "Admin":
          bgClass = "bg-green-100";
          textClass = "text-green-800 capitalize text-[12px] ";
          break;
        case "ICT":
          bgClass = "bg-teal-100";
          textClass = "text-teal-800 capitalize text-[12px] ";
          break;
        case "Employee":
          bgClass = "bg-yellow-100";
          textClass = "text-yellow-800 capitalize text-[12px] ";
          break;
        default:
          // Fallback for unexpected values
          bgClass = "bg-gray-100";
          textClass = "text-gray-800";
      }

      return (
        <span
          className={`px-2 py-1 rounded text-sm font-medium ${bgClass} ${textClass}`}
        >
          {value}
        </span>
      );
    }

    // Fallback for unexpected types
    return null;
  }, },
    {
      key: "actions",
      header: "Actions",
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
              <Link to={`${paths.Users}/${row._id}`}>View</Link>
              {(user.role === UserRole.ICT || user.role ===UserRole.MANAGER || user.id === row._id) && (
                <>
              <Link to={`${paths.Users}/edit/${row._id}`}>Update</Link>
              <button
                onClick={() => handleDelete(row._id)}
                className="text-red-500"
              >
                Delete
              </button>
              </>
              ) }
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

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const totalPages = Math.ceil(data.length / pageSize);

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`${endpoints.getAllUsers}`);
        setData(response.data.data);
        setError(null);
      } catch {
        setError("An error occurred");
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(paths.AdminDashboard);
    }
  };

  return (
    <div>
      <DeleteModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={confirmDelete}
        message="Are you Sure You want to this user?"
      />
      {/* Render ErrorAlert if there's an error */}
      {error && <ErrorAlert message={error} />}

      <div className="my-4 w-full flex items-center justify-between">
        <FaArrowLeftLong
          onClick={() => handleGoBack()}
          className="cursor-pointer text-2xl text-dark lg:hidden"
        />
        <h1 className="text-primary tracking-[1px]">All Users ({data.length}) </h1>
        <div className="">
          {(user.role !== UserRole.EMPLOYEE) && (
          <Link
            to={`${paths.Users}/add`}
            className="btn btn-primary py-2 rounded-sm"
          >
            Add New
          </Link>
           )}
        </div>
        {/* Table */}
      </div>
      {/* Table */}
      <Table
        data={paginatedData}
        columns={columns}
        keyExtractor={keyExtractor}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default AdminStaff;
