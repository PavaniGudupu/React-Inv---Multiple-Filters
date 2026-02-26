import React from "react";
import "../Styles/Home.css";
import { AiFillProduct } from "react-icons/ai";
import { HiOutlineHome } from "react-icons/hi";
import { RiDashboardLine } from "react-icons/ri";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Left side */}
      <div className="logo">
        <AiFillProduct className="icon" />
        <span>Product Inventory Management</span>
      </div>

      {/* Right side */}
      <ul className="nav-links">
        <Link to="/">
          <button>
            <HiOutlineHome /> Home
          </button>
        </Link>
        <Link to="/dashboard">
          <button>
            <RiDashboardLine /> Dashboard
          </button>
        </Link>
        <Link to="/addProduct">
          <button>
            <FaCartPlus /> Add Product
          </button>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
