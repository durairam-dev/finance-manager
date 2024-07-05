import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBarComponent";
import Home from "./pages/home";
import Categories from "./pages/categories";
import Expenses from "./pages/expenses";
import Incomes from "./pages/incomes";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/incomes" element={<Incomes />} />
      </Routes>
    </Router>
  );
};

export default App;
