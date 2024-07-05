import React from "react";
import IncomeList from "../components/IncomeListComponent";

const Incomes = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Incomes</h1>
      <IncomeList />
    </div>
  );
};

export default Incomes;
