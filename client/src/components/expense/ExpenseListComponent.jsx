import React, { useState, useEffect } from "react";
import { getExpenses, deleteExpense } from "../../api/apiEndpoint";
import { formatDate } from "../../utils/dateFormatUtils";
import { groupByDate } from "../../utils/responseUtils";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { LuIndianRupee } from "react-icons/lu";
import Pagination from "../PaginationComponent";

const ExpenseList = ({ setExpenseId, onOpen }) => {
  const [expenses, setExpenses] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchExpenses(page);
  }, [page]);

  const fetchExpenses = async (page) => {
    const response = await getExpenses(page, 10);
    setExpenses(groupByDate(response.expenses));
    setTotalPages(response.totalPages);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleEditExpense = async (id) => {
    setExpenseId(id);
    onOpen();
  };

  const handleDeleteExpense = async (id) => {
    await deleteExpense(id);
    fetchExpenses();
  };

  return (
    <div className="mt-2 lg:p-4 p-2 relative pb-20">
      <ul className="flex flex-col space-y-2">
        {Object.keys(expenses).map((date) => (
          <li key={date}>
            <h2 className="w-full text-md text-white font-semibold bg-slate-400 rounded-md shadow-md p-2">
              {formatDate(date)}
            </h2>
            <ul className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-4 gap-2 mt-2">
              {expenses[date].map((expense) => (
                <li
                  key={expense._id}
                  className="flex flex-col lg:space-y-4 space-y-2 bg-amber-300 rounded-md shadow-md lg:p-4 p-2"
                >
                  <div className="w-full flex justify-between items-center">
                    <span className="block bg-white text-amber-300 rounded-md shadow px-2 py-1 capitalize">
                      {expense.category_id.name}
                    </span>
                    <ul className="flex space-x-2">
                      <li
                        onClick={() => handleEditExpense(expense._id)}
                        className="bg-white text-amber-300 rounded-md shadow-md p-1"
                      >
                        <FaEdit />
                      </li>
                      <li
                        onClick={() => handleDeleteExpense(expense._id)}
                        className="bg-white text-amber-300 rounded-md shadow-md p-1"
                      >
                        <MdDelete />
                      </li>
                    </ul>
                  </div>
                  <p className="px-2 font-medium dark:text-gray-700">
                    {expense.description}
                  </p>
                  <div className="flex justify-end items-center">
                    <p className="flex items-center bg-white text-amber-300 px-2 py-1 rounded-md">
                      <LuIndianRupee className="inline" />
                      {expense.amount}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ExpenseList;
