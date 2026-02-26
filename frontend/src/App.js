import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import EditProduct from './Pages/EditProduct';
import { AddProduct } from './Pages/AddProduct';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/editProduct/' element={<EditProduct />} />
        <Route path='/addProduct' element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer
    position='top-right'
    autoClose={3000}
    hideProgressBar={false}
    pauseOnHover
    closeOnClick
    />
    </div>
  );
};

export default App;
