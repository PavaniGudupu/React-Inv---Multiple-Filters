import React from 'react';
import { Link } from 'react-router-dom';
import { GrLinkNext } from "react-icons/gr";
import { FaCartPlus } from "react-icons/fa";
import '../Styles/Home.css';

const MainCard = () => {
  return (
    <div className='main-card'>
        <h1>Product Inventory Management</h1>
        <p>A modern platform for managing products, tracking stock levels, and organizing inventory data with ease.</p>
    
    <Link to='/dashboard'>
      <button>View Dashboard <GrLinkNext /></button>
    </Link>

      <Link to='/addProduct'>
      <button>Add New Product <FaCartPlus /></button>
    </Link>

    </div>
  )
}

export default MainCard