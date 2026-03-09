#  🧩 Filter Panel + Filter Chips – React Inventory Dashboard


A full-stack Inventory Management Dashboard built with React.js + Node.js + PostgreSQL, implementing advanced multi-column filtering from a filter panel with dynamic SQL generation on the backend.

This project demonstrates a real-world filtering system where users can apply multiple filters simultaneously, visualize them as removable filter chips, and dynamically fetch filtered data from the backend.

The focus of this implementation is:
- Dynamic filter query building
- Multiple filter application
- Filter chips UI
- Server-side pagination with filters
- Full frontend ↔ backend filter integration

https://github.com/user-attachments/assets/74bb2322-0d15-496d-9cc6-d302c9c04f39




---

## 🚀 Features
- Advanced Filtering
- Multi-column filter panel
- Supports numeric and text filters
- Operators supported
- 🗑 CRUD Operations

## 🧩 Filter Chips UI

Applied filters appear as chips above the table.

Products are fetched from backend using:
Example:
```
product_name contains rice  ✖
mrp > 1000                  ✖
classification contains veg ✖
```
Users can:
- Remove individual filters
- Clear all filters instantly

---

## 🧠 Core Implementation

---




### 1️⃣ Dynamic Backend Filter Builder

Filters are sent as an object:

```js
{
  "filters": {
    "mrp": { "operator": "gt", "value": 1000 },
    "product_name": { "operator": "ilike", "value": "rice" }
  }
}
```

Backend dynamically builds SQL conditions.

```

for (let key in filters) {
  const filter = filters[key];
  const operator = filter.operator || "ilike";

  if (operator === "eq") {
    conditions.push(`${key} = '${filter.value}'`);
  }

  if (operator === "gt") {
    conditions.push(`${key} > ${filter.value}`);
  }

  if (operator === "lt") {
    conditions.push(`${key} < ${filter.value}`);
  }

  if (operator === "ilike") {
    conditions.push(`${key} ILIKE '%${filter.value}%'`);
  }
}

```

Generated SQL example:

```
SELECT p.*, c.category
FROM products p
INNER JOIN category c
ON p.category_id = c.category_id
WHERE mrp > 1000
AND product_name ILIKE '%rice%'
ORDER BY p.id DESC
LIMIT 10 OFFSET 0

```


---

### 2️⃣ Filter Panel (Frontend)

Users apply filters from a dedicated panel.
Example state:

```js
const [filters, setFilters] = useState({
  product_name: "",
  mrpOperator: "",
  mrpValue: "",
  spOperator: "",
  spValue: "",
  classification: "",
});
```

Filters are converted before API request.

```
formattedFilters.mrp = {
  operator: filters.mrpOperator,
  value: filters.mrpValue
};
```
API request:
```
fetch("/productList-Filters", {
  method: "POST",
  body: JSON.stringify({
    filters: formattedFilters,
    page: 1,
    size: 10
  })
});
```
---

### 3️⃣ Filter Chips UI
After applying filters:
```js
setAppliedFilters(formattedFilters);
setIsFilterMode(true);
```

Chips render dynamically:
```
{Object.entries(appliedFilters).map(([key, value]) => (
  <span className="chip">
    {key} {value.operator} {value.value}
  </span>
))}
```


---

### 4️⃣ Remove Individual Filter

Each chip contains a remove button.

```js
delete updated[key];
setAppliedFilters(updated);
```
If all filters removed:
---

## 5️⃣ Clear All Filters

```js
setAppliedFilters({});
setIsFilterMode(false);
setCurrentPage(1);
```

Result:

- All filters removed
- Normal dashboard view restored
---


---

## 🌐 API Endpoints Used

| Endpoint               | Method | Purpose                    |
| ---------------------- | ------ | -------------------------- |
| `/productList`         | POST   | Normal search + pagination |
| `/productList-Filters` | POST   | Apply multiple filters     |
| `/product/:id`         | POST   | Get product by ID          |
| `/category`            | POST   | Get category list          |
| `/deleteProduct/:id`   | POST   | Delete product             |




---

## 🛠 Tech Stack

Fropnend: 

- React.js  
- React Router  
- Axios  
- Fetch API  
- React Toastify  
- LocalStorage  
- Bootstrap  
- CSS

Backend: 

- Node.js
- Express.js
- PostgreSQL
- pg-promise

---

## 💡 Key Learning Concepts

This project demonstrates: 

- Dynamic SQL generation
- Advanced React state management
- Filter panel architecture
- Server-side pagination
- Frontend ↔ backend filter integration
- Reusable UI components  



## 👩‍💻 Author

**G. Pavani**  

⭐ If you found this useful, give it a star!

