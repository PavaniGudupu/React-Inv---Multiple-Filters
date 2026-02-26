# Multiple Filters in Panel – React Inventory


A frontend Inventory Management Dashboard built with **React.js**, implementing advanced **pagination handling** and **URI encoded component communication** to preserve user state and improve navigation experience.

This project focuses on:

- Managing large datasets using server-side pagination  
- Preserving page state after edit operations  
- Passing row data securely using URI encoding  
- Restoring user search & filter context  
- Enhancing user experience with dynamic highlighting  


<img width="1919" height="1033" alt="image" src="https://github.com/user-attachments/assets/a3cb3918-a1b4-48c8-b5b2-f341eef135d2" />



---

## 🚀 Features

- 🔢 Server-side pagination  
- 🔍 Search & category filtering  
- 🔁 First / Previous / Next / Last navigation  
- 🔐 URI Encoded product data transfer  
- 💾 LocalStorage context preservation  
- 🎯 Highlight last edited row  
- 🗑 Delete with confirmation  
- 🌐 API integration using Fetch & Axios  
- 📹 Demo video included  

---

## 🧠 Core Implementation Overview

### 1️⃣ Pagination Logic

Products are fetched from backend using:

```js
{
  filterCategory,
  search,
  page: currentPage,
  size: 10
}
```

### Flow

User Action  
⬇  
API Call (`/dashboard`)  
⬇  
Backend returns paginated data  
⬇  
Update `results` and `totalPages`  
⬇  
Render dynamic pagination buttons  

---

### 2️⃣ Dynamic Pagination Buttons

No hardcoded page numbers.

```js
for (let page = 1; page <= totalPages; page++) {
  buttons.push(
    <button
      key={page}
      className={page === currentPage ? "active" : ""}
      onClick={() => setCurrentPage(page)}
    >
      {page}
    </button>
  );
}
```

✔ Automatically adjusts based on backend data  
✔ Highlights active page  
✔ Disables navigation buttons when required  

---

### 3️⃣ URI Encoded Component Communication

Instead of fetching product again in edit page, row data is:

1. Converted to JSON  
2. Encoded using `btoa()`  
3. URI encoded  
4. Passed via query parameter  

```js
const encodeCtx = (obj) =>
  encodeURIComponent(btoa(JSON.stringify(obj)));
```

Navigation example:

```
/EditProduct?ctx=<encodedData>
```

---

### 4️⃣ Decoding in Edit Component

```js
const decodedString = atob(decodeURIComponent(ctx));
const product = JSON.parse(decodedString);
```

✔ Reduces unnecessary API calls  
✔ Faster page load  
✔ Cleaner architecture  

---

### 5️⃣ Context Restoration After Edit

Before navigating to edit page:

```js
localStorage.setItem("dashboardCtx", JSON.stringify({
  page: currentPage,
  search,
  filterCategory,
  editedId: item.id,
}));
```

After returning to dashboard:

```js
const savedCtx = localStorage.getItem("dashboardCtx");
```

✔ Restores:
- Current Page  
- Search Input  
- Selected Filter  
- Highlights edited row  

---

## 🎯 Highlight Last Edited Row

```js
className={item.id === lastEditId ? "highlight-row" : ""}
```

Improves visibility and user confidence after update.

---


---

## 🌐 API Endpoints Used

| Endpoint             | Method | Purpose                  |
|----------------------|--------|--------------------------|
| `/dashboard`         | POST   | Fetch paginated products |
| `/deleteProduct/:id` | POST   | Delete product           |
| `/editProduct/:id`   | POST   | Update product           |
| `/category`          | POST   | Fetch categories         |
| `/product/:id`       | POST   | Fetch single product     |

---

## 🛠 Tech Stack

- React.js  
- React Router  
- Axios  
- Fetch API  
- React Toastify  
- LocalStorage  
- Bootstrap  
- CSS  

---

## 👩‍💻 Author

**G. Pavani**  

⭐ If you found this useful, give it a star!

