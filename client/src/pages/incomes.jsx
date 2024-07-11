import { useState } from "react";
import IncomeForm from "../components/income/FormComponent";
import IncomeList from "../components/income/IncomeListComponent";

const Incomes = () => {
  const [isIncomeFormOpen, setIncomeFormOpen] = useState(false);
  const [incomeId, setIncomeId] = useState(0);

  const openIncomeForm = () => setIncomeFormOpen(true);
  const closeIncomeForm = () => {
    setIncomeFormOpen(false);
    setIncomeId("");
  };
  return (
    <div className="lg:p-4 p-2 bg-gray-200 dark:bg-gray-800">
      <div className="flex flex-row justify-between items-center">
        <h1 className="dark:text-white text-3xl font-bold">Incomes</h1>
        <button
          onClick={openIncomeForm}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          New Income
        </button>
      </div>
      <IncomeList setIncomeId={setIncomeId} onOpen={openIncomeForm} />
      {isIncomeFormOpen && (
        <IncomeForm onClose={closeIncomeForm} incomeId={incomeId} />
      )}
    </div>
  );
};

export default Incomes;
