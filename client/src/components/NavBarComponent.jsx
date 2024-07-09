import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo-light.png";
import { IoMenu, IoClose } from "react-icons/io5";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container w-full mx-auto flex lg:flex-row flex-col justify-between items-center">
        <div className="w-full flex flex-row justify-between">
          <Link to="/">
            <img className="h-8 w-56" src={Logo} alt="Logo" />
          </Link>
          <button
            onClick={toggleMenu}
            className="block lg:hidden text-white focus:outline-none"
          >
            {isOpen ? (
              <IoClose className="h-6 w-6" />
            ) : (
              <IoMenu className="h-6 w-6" />
            )}
          </button>
        </div>
        <div
          className={`lg:w-auto w-full lg:flex lg:items-center lg:pl-0 pl-4 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="lg:flex lg:space-x-4 lg:justify-between text-white text-sm">
            <li
              className="block lg:inline-block lg:mt-0 mt-4 lg:mr-0 mr-4 hover:text-blue-950"
              onClick={toggleMenu}
            >
              <Link to="/categories">Categories</Link>
            </li>
            <li
              className="block lg:inline-block lg:mt-0 mt-4 lg:mr-0 mr-4 hover:text-blue-950"
              onClick={toggleMenu}
            >
              <Link to="/expenses">Expenses</Link>
            </li>
            <li
              className="block lg:inline-block lg:mt-0 mt-4 lg:mr-0 mr-4 hover:text-blue-950"
              onClick={toggleMenu}
            >
              <Link to="/incomes">Incomes</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
