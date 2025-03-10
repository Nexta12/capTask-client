import { paths } from "@routes/paths";
import { UserRole } from "@utils/constants";
import { getNestedValue } from "@utils/helpers";
import { FaEllipsisVertical } from "react-icons/fa6";
import { Link } from "react-router-dom";

// columns.js
export const getColumns = (user, takeAction, handleReadMore, togglePopup, handleDelete, visiblePopup, popupRef) => [
    {
      key: "amount",
      header: "Amount (₦)",
      render: (value) => new Intl.NumberFormat("en-US").format(value),
    },
    {
      key: "purpose",
      header: "Purpose",
    },
    {
      key: "contactInfo.fullName",
      header: "Recorded By",
      render: (_, row) =>
        `${getNestedValue(row, "staff.firstName")} ${getNestedValue(row, "staff.lastName")}`,
    },
    { key: "createdAt", header: "Record Date" },
    {
      key: "status",
      header: "Status",
      render: (value, row) => {
        const statusStyles = {
          approved: { bgClass: "bg-green-100", textClass: "text-green-800" },
          pending: { bgClass: "bg-yellow-100", textClass: "text-yellow-800" },
          declined: { bgClass: "bg-red-100", textClass: "text-red-800" },
          default: { bgClass: "bg-gray-100", textClass: "text-gray-800" },
        };
  
        const { bgClass, textClass } = statusStyles[value] || statusStyles.default;
  
        return (
          <div className="flex items-center space-x-3">
            <span className={`px-2 py-1 rounded text-sm font-medium ${bgClass} ${textClass}`}>
              {value}
            </span>
            {user.role === UserRole.manager && value === "pending" && (
              <>
                <button
                  onClick={() => takeAction("Approving", row._id)}
                  className="text-blue-500 hover:text-blue-700 text-sm underline focus:outline-none shadow-2xl"
                >
                  Approve
                </button>
                <button
                  onClick={() => takeAction("Declining", row._id)}
                  className="text-blue-500 hover:text-blue-700 text-sm underline focus:outline-none shadow-2xl"
                >
                  Decline
                </button>
              </>
            )}
          </div>
        );
      },
    },
    {
      key: "verifiedBy.fullName",
      header: "Verified By",
      render: (_, row) =>
        `${getNestedValue(row, "verifiedBy.firstName")} ${getNestedValue(row, "verifiedBy.lastName")}`,
    },
    { key: "updatedAt", header: "Verified Date" },
    {
      key: "comment",
      header: "Remark",
      render: (value, row) => (
        <button
          id={row._id}
          onClick={() => handleReadMore(value)}
          className="text-blue-500 hover:underline capitalize"
        >
          {value?.slice(0, 20)}...
        </button>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: `${user.role !== UserRole.superAdmin ? "hidden" : ""}`,
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
              <Link to={`${paths.Expenses}/update/${row._id}`}>Update</Link>
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