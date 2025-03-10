import { DateFormatter } from "@utils/helpers";
import React from "react";

// Helper function to handle rendering cell values
const renderCellValue = (value) => {
  if (React.isValidElement(value)) {
    return value; // If it's a React element, return it directly
  }

  if (typeof value === "string") {
    // Check if the string is an ISO date format
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
    if (isoDateRegex.test(value)) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        // Format the date as DD/MM/YY
       return DateFormatter(date)
      
      }
    }
    return value; // Return the string as-is if it's not a valid date
  }

  if (typeof value === "number") {
    return value; // Render numbers as-is
  }

  if (value === null || value === undefined) {
    return null; // Render nothing for null/undefined
  }

  // Fallback for other types (e.g., objects, arrays)
  return String(value);
};



// Reusable Table component
const Table = ({
  data,
  columns,
  keyExtractor,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 3; // Maximum buttons to show
    const halfVisible = Math.floor(maxVisible / 2);

    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, currentPage + halfVisible);

    // Ensure exactly `maxVisible` buttons are displayed
    if (end - start + 1 < maxVisible) {
      if (currentPage <= halfVisible) {
        end = Math.min(totalPages, maxVisible);
      } else if (currentPage + halfVisible >= totalPages) {
        start = Math.max(1, totalPages - maxVisible + 1);
      }
    }

    // Add the first page and ellipsis
    if (start > 1) {
      pageNumbers.push(
        <button
          key="1"
          onClick={() => onPageChange(1)}
          className="px-3 py-1 border rounded bg-sky-600 text-white"
        >
          1
        </button>,
      );
      if (start > 2) pageNumbers.push(<span key="start-ellipsis">...</span>);
    }

    // Add pages in the range [start, end]
    for (let i = start; i <= end; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 border rounded ${
            i === currentPage
              ? "bg-sky-500 text-white"
              : "bg-black text-white"
          }`}
        >
          {i}
        </button>,
      );
    }

    // Add the last page and ellipsis
    if (end < totalPages) {
      if (end < totalPages - 1)
        pageNumbers.push(<span key="end-ellipsis">...</span>);
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-1 border rounded bg-black text-white"
        >
          {totalPages}
        </button>,
      );
    }

    return pageNumbers;
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-auto border border-accent">
          <thead className="bg-accent text-left text-white">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`p-3 text-[12px] text-center font-medium border border-gray-300 ${column.className || ""}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={keyExtractor(row)}
                className={rowIndex % 2 === 0 ? "bg-white" : "bg-white"}
              >
                {columns.map((column) => (
                 <td
                 key={`${keyExtractor(row)}-${String(column.key)}`}
                 className={`px-2 py-3 text-sm text-gray-600 border border-gray-300 text-center ${column.className || ""}`}
               >
                 {column.render
                   ? column.render(row[column.key], row)
                   : renderCellValue(row[column.key])}
               </td>
               
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 gap-2">
          {renderPageNumbers()}
        </div>
      )}
    </>
  );
};

export default Table;
