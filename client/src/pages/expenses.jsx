import { useState } from "react";
import ExpenseForm from "../components/expense/FormComponent";
import ExpenseList from "../components/expense/ExpenseListComponent";

const Expenses = () => {
  const [isExpenseFormOpen, setExpenseFormOpen] = useState(false);
  const [expenseId, setExpenseId] = useState(0);

  const openExpenseForm = () => setExpenseFormOpen(true);
  const closeExpenseForm = () => {
    setExpenseFormOpen(false);
    setExpenseId("");
  };

  return (
    <div className="lg:p-4 p-2">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-bold">Expenses</h1>
        <button
          onClick={openExpenseForm}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          New Expense
        </button>
      </div>
      <ExpenseList setExpenseId={setExpenseId} onOpen={openExpenseForm} />
      {isExpenseFormOpen && (
        <ExpenseForm onClose={closeExpenseForm} expenseId={expenseId} />
      )}
    </div>
  );
};

export default Expenses;
