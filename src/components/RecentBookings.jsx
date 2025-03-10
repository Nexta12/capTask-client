import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import { getNestedValue } from "@utils/helpers";
import { useEffect, useState } from "react";
import Table from "./Table";
import ErrorAlert from "@pages/errorPages/errorAlert";


const RecentBookings = () => {

 const [data, setData] = useState([]);
const [error, setError] = useState(null);
const keyExtractor = (row) => row._id;

 const dataToDisplay = data.slice(0, 3)

 const columns = [
    {
      key: "apartmentId.title",
      header: "Apartment",
      render: (_, row) => getNestedValue(row, "apartmentId.title"),
      className: 'capitalize'
    },
    {
      key: "contactInfo.fullName",
      header: "Guest",
      render: (_, row) =>
        `${getNestedValue(row, "contactInfo.firstName")} ${
          getNestedValue(row, "contactInfo.lastName") || "Processing..."
        }`,
    },
    {
      key: "startDate",
      header: "Check In",
    },
    {
      key: "endDate",
      header: "Check Out",
    },

    {
      key: "totalPayment",
      header: "Amount Paid (₦)",
      render: (value) => {
        return new Intl.NumberFormat("en-US").format(value);
      },
    },
  
    {
      key: "paymentStatus",
      header: "Payment Status",
      render: (value) => {
        if (typeof value === "string") {
          // Determine the styles based on the value
          let bgClass = "";
          let textClass = "";
          switch (value) {
            case "pending":
              value = "in progress";
              bgClass = "bg-yellow-100";
              textClass = "text-yellow-800 capitalize text-[12px] ";
              break;
            case "failed":
              bgClass = "bg-red-100";
              textClass = "text-red-800 capitalize text-[12px] ";
              break;
            case "paid":
              value = "Successful";
              bgClass = "bg-green-500";
              textClass = "text-white capitalize text-[12px] ";
              break;
            case "part payment":
              value = "Incomplete";
              bgClass = "bg-blue-500";
              textClass = "text-white capitalize text-[12px] ";
              break;
            default:
              // Fallback for unexpected values
              bgClass = "bg-gray-100";
              textClass = "text-gray-800 whitespace-nowrap capitalize ";
            
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
      },
    },
    {
      key: "status",
      header: "Booking Status",
      render: (value) => {
        if (typeof value === "string") {
          // Determine the styles based on the value
          let bgClass = "";
          let textClass = "";
          switch (value) {
            case "completed":
              value = "Active";
              bgClass = "bg-green-100";
              textClass = "text-green-800 capitalize text-[12px] ";
              break;
            case "pending":
              bgClass = "bg-yellow-100";
              textClass = "text-yellow-800 capitalize text-[12px] ";
              break;
            case "canceled":
              bgClass = "bg-red-100";
              textClass = "text-red-800 capitalize text-[12px] ";
              break;
            case "confirmed":
              bgClass = "bg-blue-100";
              textClass = "text-blue-800 capitalize text-[12px] ";
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
      },
    },
  
  ];
 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(endpoints.getAllBookings);
        setData(response.data);
        setError(null);
      } catch {
        setError("An error occurred");
      }
    };
    fetchData();
  }, []);



  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 overflow-x-auto">
           {/* Render ErrorAlert if there's an error */}
      {error && <ErrorAlert message={error} />}
        <strong className="text-gray-700 font-medium" >Recent Bookings</strong>
        <div className="mt-3">
        <Table
        data={dataToDisplay}
        columns={columns}
        keyExtractor={keyExtractor}
      />
        </div>
    </div>
  )
}

export default RecentBookings