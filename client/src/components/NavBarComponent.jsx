import { useState } from "react";
import { Link } from "react-router-dom";
import LogoDark from "../assets/images/logo-dark.png";
import LogoLight from "../assets/images/logo-light.png";
import { IoMenu, IoClose } from "react-icons/io5";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="dark:bg-gray-950 bg-gray-500 p-4">
      <div className="container w-full mx-auto flex lg:flex-row flex-col justify-between items-center">
        <div className="w-full flex flex-row justify-between">
          <Link to="/">
            <img className="dark:hidden h-8 w-56" src={LogoDark} alt="Logo" />
            <img
              className="hidden dark:block h-8 w-56"
              src={LogoLight}
              alt="Logo"
            />
          </Link>
          <button
            onClick={toggleMenu}
            className="block lg:hidden text-gray-950 dark:text-gray-400 hover:text-white dark:hover:text-white focus:outline-none"
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
          <ul className="lg:flex lg:space-x-4 lg:justify-between text-gray-950 dark:text-gray-400 text-sm">
            <li
              className="block lg:inline-block lg:mt-0 mt-4 lg:mr-0 mr-4 hover:text-white dark:hover:text-white"
              onClick={toggleMenu}
            >
              <Link to="/categories">Categories</Link>
            </li>
            <li
              className="block lg:inline-block lg:mt-0 mt-4 lg:mr-0 mr-4 hover:text-white dark:hover:text-white"
              onClick={toggleMenu}
            >
              <Link to="/expenses">Expenses</Link>
            </li>
            <li
              className="block lg:inline-block lg:mt-0 mt-4 lg:mr-0 mr-4 hover:text-white dark:hover:text-white"
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
