import React, { useEffect, useState } from "react";
import { deleteIncome, getIncomes } from "../../api/apiEndpoint";
import { formatDate } from "../../utils/dateFormatUtils";
import { groupByDate } from "../../utils/responseUtils";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { LuIndianRupee } from "react-icons/lu";
import Pagination from "../PaginationComponent";

const IncomeList = ({ setIncomeId, onOpen }) => {
  const [incomes, setIncomes] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchIncomes(page);
  }, [page]);

  const fetchIncomes = async (page) => {
    const response = await getIncomes(page, 10);
    setIncomes(groupByDate(response.incomes));
    setTotalPages(response.totalPages);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleEditIncome = async (id) => {
    setIncomeId(id);
    onOpen();
  };

  const handleDeleteIncome = async (id) => {
    await deleteIncome(id);
    fetchIncomes();
  };

  return (
    <div className="p-4">
      <ul className="flex flex-col space-y-2">
        {Object.keys(incomes).map((date) => (
          <li key={date}>
            <h2 className="w-full text-md text-white font-semibold bg-slate-400 rounded-md shadow-md p-2">
              {formatDate(date)}
            </h2>
            <ul className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-4 gap-2 mt-2">
              {incomes[date].map((income) => (
                <li
                  key={income._id}
                  className="flex flex-col lg:space-y-4 space-y-2 bg-amber-200 rounded-md shadow-md lg:p-4 p-2"
                >
                  <div className="w-full flex justify-between items-center">
                    <span className="block bg-white rounded-md shadow-md px-2 py-1 capitalize">
                      {income.category_id.name}
                    </span>
                    <ul className="flex space-x-2">
                      <li
                        onClick={() => handleEditIncome(income._id)}
                        className="bg-white rounded-md shadow-md p-1"
                      >
                        <FaEdit />
                      </li>
                      <li
                        onClick={() => handleDeleteIncome(income._id)}
                        className="bg-white rounded-md shadow-md p-1"
                      >
                        <MdDelete />
                      </li>
                    </ul>
                  </div>
                  <p className="px-2">{income.description}</p>
                  <div className="flex justify-end items-center">
                    <p className="flex items-center bg-white px-2 py-1 rounded-md">
                      <LuIndianRupee className="inline" />
                      {income.amount}
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

export default IncomeList;
