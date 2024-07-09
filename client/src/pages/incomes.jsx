import { useState } from "react";
import IncomeForm from "../components/income/FormComponent";
import IncomeList from "../components/income/IncomeListComponent";

const Incomes = () => {
  const [isIncomeFormOpen, setIncomeFormOpen] = useState(false);

  const openIncomeForm = () => setIncomeFormOpen(true);
  const closeIncomeForm = () => setIncomeFormOpen(false);
  return (
    <div className="p-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-bold mb-4">Incomes</h1>
        <button
          onClick={openIncomeForm}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          New Income
        </button>
      </div>
      <IncomeForm isOpen={isIncomeFormOpen} onClose={closeIncomeForm} />
      <IncomeList />
    </div>
  );
};

export default Incomes;
