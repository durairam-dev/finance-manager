import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Always show the first page
    pageNumbers.push(1);

    if (currentPage > 4) {
      pageNumbers.push("...");
    }

    // Show the nearest 4 page numbers
    for (
      let i = Math.max(2, currentPage - 2);
      i <= Math.min(totalPages - 1, currentPage + 2);
      i++
    ) {
      pageNumbers.push(i);
    }

    if (currentPage < totalPages - 3) {
      pageNumbers.push("...");
    }

    // Always show the last page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <ul className="fixed bottom-0 left-0 w-full shadow-md p-4 flex justify-center items-center space-x-2 bg-gray-200 dark:bg-gray-800">
      <li
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-blue-500 dark:text-gray-950 text-white p-2 rounded disabled:opacity-50"
      >
        <IoIosArrowBack className="h-6 w-6" />
      </li>
      {getPageNumbers().map((number, index) => (
        <li
          key={index}
          onClick={() => number !== "..." && onPageChange(number)}
          className={`px-4 py-2 rounded ${
            currentPage === number
              ? "bg-blue-700 dark:text-gray-950 text-white"
              : "bg-blue-500 dark:text-gray-950 text-white"
          }`}
          disabled={number === "..."}
        >
          {number}
        </li>
      ))}
      <li
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-blue-500 dark:text-gray-950 text-white p-2 rounded disabled:opacity-50"
      >
        <IoIosArrowForward className="h-6 w-6" />
      </li>
    </ul>
  );
};

export default Pagination;
