import React, { useState, useEffect } from "react";
import "../Styles/Add.css";
import { FaCheck } from "react-icons/fa";


const FitlerScreen = ({ isOpen, isClose }) => {
  const [filterCategory, setFilterCategory] = useState([]);
  const priceFilters = [
    { label: "⇄", value: "" },
    { label: "<", value: "lt" },
    { label: "=", value: "eq" },
    { label: ">", value: "gt" },
  ];

  useEffect(() => {
    fetch(`http://localhost:4000/category`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((json) => setFilterCategory(json.response))
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className={`filter-panel ${isOpen ? "open" : ""}`}>
      <div className="filter-header">
        <h1>Search Filter</h1>
        <button className="filter-close" onClick={isClose}>
          X
        </button>
      </div>

      <div className="filter-body">
        <div className="row">
          <div className="col-md-12">
            <br></br>
            <label className="form-label">Product Code</label>
            <input
              className="filter-control"
              name="id"
              placeholder="Enter Product Code"
              value=""
              type="number"
              required
            />
          </div>
        </div>
<br></br>
        <div className="row">
          <div className="col-md-12">
            <label className="form-label">Product Name</label>
            <input
              className="filter-control"
              name="id"
              placeholder="Enter Product Name"
              value=""
              type="text"
              required
            />
          </div>
        </div>
<br></br>
        <div className="row">
          <div className="col-md-12">
            <label className="form-label">Category</label>
            <select className="filter-select" name={filterCategory} required>
              <option className="filter-select-placeholder" value="">
                --- Select the Category ---
              </option>

              {filterCategory.map((item) => {
                return (
                  <option key={item.category_id} value={item.category}>
                    {item.category}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
<br></br>
        <div className="row">
          <div className="col-md-4">
            <label className="form-label">MRP</label>
            <select name="filter-mrp" className="form-price-select">
              {priceFilters.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <input
              className="form-control"
              name="mrp"
              value=""
              placeholder="Enter MRP"
              type="number"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <label className="form-label">SP  <br></br></label><br></br><br></br>
            <select name="filter-rp" className="form-price-select">
              {priceFilters.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <input
              className="form-control"
              name="sp"
              placeholder="Enter SP"
              value=""
              type="number"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <label className="form-label">CP  <br></br></label><br></br>
            <select name="filter-cp" className="form-price-select">
              {priceFilters.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <input
              className="form-control"
              name="cp"
              placeholder="Enter CP"
              value=""
              type="number"
              step="0.01"
              required
            />
          </div>
        </div>
<br></br>
        <div className="row">
          <div className="col-md-12">
            <label className="form-label">Classification</label>
            <input
              className="filter-control"
              name="classification"
              placeholder="Enter Classification"
              value=""
              type="text"
            />
          </div>
        </div>
<br />
        <div className="row">
          <div className="col-md-12">
            <label className="form-label">Size</label>
            <input
              className="filter-control"
              name="size"
              placeholder="Enter Size"
              value=""
              type="text"
            />
          </div>
        </div>

<br></br>

<div className="row">
  <button type="submit" className="filter-apply-btn">Apply <FaCheck /></button>
  <button type="submit" onClick={isClose} className="filter-close-btn">Back </button>

  </div>


      </div>
    </div>
  );
};

export default FitlerScreen;






// import React, { useEffect, useState } from "react";
// import "../Styles/FilterPanel.css";

// const FilterScreen = ({ isOpen, onClose }) => {
//   // category list from API
//   const [categories, setCategories] = useState([]);

//   // filter values
//   const [filters, setFilters] = useState({
//     productId: "",
//     productName: "",
//     category: "",
//     mrpOperator: "",
//     mrpValue: "",
//     spOperator: "",
//     spValue: "",
//     cpOperator: "",
//     cpValue: "",
//     classification: "",
//     size: ""
//   });

//   const priceOperators = [
//     { label: "⇄", value: "" },
//     { label: "<", value: "lt" },
//     { label: "=", value: "eq" },
//     { label: ">", value: "gt" }
//   ];

//   // fetch categories
//   useEffect(() => {
//     fetch("http://localhost:4000/category", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" }
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) setCategories(data.response);
//       })
//       .catch(err => console.log(err.message));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className={`filter-panel ${isOpen ? "open" : ""}`}>
//       <div className="filter-header">
//         <h2>Search Filter</h2>
//         <button className="filter-close" onClick={onClose}>×</button>
//       </div>

//       <div className="filter-body">

//         {/* Product ID */}
//         <div className="filter-group">
//           <label>Product Code</label>
//           <input
//             name="productId"
//             value={filters.productId}
//             onChange={handleChange}
//             type="number"
//             placeholder="Enter Product Code"
//           />
//         </div>

//         {/* Product Name */}
//         <div className="filter-group">
//           <label>Product Name</label>
//           <input
//             name="productName"
//             value={filters.productName}
//             onChange={handleChange}
//             type="text"
//             placeholder="Enter Product Name"
//           />
//         </div>

//         {/* Category */}
//         <div className="filter-group">
//           <label>Category</label>
//           <select
//             name="category"
//             value={filters.category}
//             onChange={handleChange}
//             required
//           >
//             <option value="">-- Select Category --</option>
//             {categories.map(cat => (
//               <option key={cat.category_id} value={cat.category}>
//                 {cat.category}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* MRP */}
//         <div className="filter-row">
//           <label>MRP</label>
//           <select
//             name="mrpOperator"
//             value={filters.mrpOperator}
//             onChange={handleChange}
//           >
//             {priceOperators.map(op => (
//               <option key={op.value} value={op.value}>
//                 {op.label}
//               </option>
//             ))}
//           </select>

//           <input
//             name="mrpValue"
//             value={filters.mrpValue}
//             onChange={handleChange}
//             type="number"
//             step="0.01"
//             placeholder="Enter MRP"
//           />
//         </div>

//         {/* SP */}
//         <div className="filter-row">
//           <label>SP</label>
//           <select
//             name="spOperator"
//             value={filters.spOperator}
//             onChange={handleChange}
//           >
//             {priceOperators.map(op => (
//               <option key={op.value} value={op.value}>
//                 {op.label}
//               </option>
//             ))}
//           </select>

//           <input
//             name="spValue"
//             value={filters.spValue}
//             onChange={handleChange}
//             type="number"
//             step="0.01"
//             placeholder="Enter SP"
//           />
//         </div>

//         {/* CP */}
//         <div className="filter-row">
//           <label>CP</label>
//           <select
//             name="cpOperator"
//             value={filters.cpOperator}
//             onChange={handleChange}
//           >
//             {priceOperators.map(op => (
//               <option key={op.value} value={op.value}>
//                 {op.label}
//               </option>
//             ))}
//           </select>

//           <input
//             name="cpValue"
//             value={filters.cpValue}
//             onChange={handleChange}
//             type="number"
//             step="0.01"
//             placeholder="Enter CP"
//           />
//         </div>

//         {/* Classification */}
//         <div className="filter-group">
//           <label>Classification</label>
//           <input
//             name="classification"
//             value={filters.classification}
//             onChange={handleChange}
//             type="text"
//             placeholder="Enter Classification"
//           />
//         </div>

//         {/* Size */}
//         <div className="filter-group">
//           <label>Size</label>
//           <input
//             name="size"
//             value={filters.size}
//             onChange={handleChange}
//             type="text"
//             placeholder="Enter Size"
//           />
//         </div>

//         <button className="filter-apply">Apply Filters</button>
//       </div>
//     </div>
//   );
// };

// export default FilterScreen;