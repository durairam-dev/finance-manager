import React from "react";
import ExpenseList from "../components/ExpenseListComponent";

const Expenses = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Expenses</h1>
      <ExpenseList />
    </div>
  );
};

export default Expenses;
