import db from "./db.js";
// import { allowedOperators, allowedColumns } from "../utils/filterConfig.js";

// export const getProductList = async (params) => {
//   const { filters = {}, size = 10, offset = 0 } = params;

//   let sql = `
//     SELECT p.*, c.category
//     FROM products p
//     INNER JOIN category c ON p.category_id = c.category_id
//   `;

//   let conditions = [];
//   //   conditions = [
//   //   "p.mrp > ${value1}",
//   //   "p.sp < ${value2}"
//   // ]

//   let values = { size, offset };
//   //   values = {
//   //   value1: 2000,
//   //   value2: 4000
//   // }
//   let index = 1;

//   // Loop through filters
//   for (let field in filters) {
//     //   field = "mrp"
//     // filters = {
//     //   mrp: { operator: ">", value: 2000 },
//     //   sp: { operator: "<", value: 4000 }
//     // }

//     // allowedColumns = {
//     //   mrp: "p.mrp",
//     //   sp: "p.sp"
//     // }

//     // allowedOperators = {
//     //   ">": ">",
//     //   "<": "<"
//     // }

//     // index = 1
//     // conditions = []
//     // values = {}

//     const column = allowedColumns[field]; // mrp → p.mrp
//     if (!column) continue; // If not allowed → skip.

//     const filter = filters[field]; // { operator: ">", value: 2000 }

//     const operator = allowedOperators[filter.operator];
//     if (!operator) continue; // skip invalid operator

//     const paramName = `value${index}`;

//     // Handle ILIKE separately
//     if (operator === "ILIKE") {
//       values[paramName] = `%${filter.value}%`;
//       // values = {
//       //   value1: 2000
//       // }
//     } else {
//       values[paramName] = filter.value;
//     }

//     conditions.push(`${column} ${operator} \${${paramName}}`);
//     // conditions.push("p.mrp > ${value1}");
//     index++;
//   }
//   if (conditions.length > 0) {
//     sql += ` WHERE ` + conditions.join(" AND "); // WHERE p.mrp > $/value1/ AND p.sp < $/value2/
//   }
//   sql += `
//     ORDER BY p.id DESC
//     LIMIT \${size} OFFSET \${offset}`;
//   return db.manyOrNone(sql, values);
// };

// export const getProductCount = async (columns) => {
//   const { filters = {} } = columns;

//   let sql = `
//     SELECT COUNT(*) AS total
//     FROM products p
//     INNER JOIN category c ON p.category_id = c.category_id
//   `;

//   let conditions = [];
//   let values = {};
//   let index = 1;

//   for (let field in filters) {
//     const column = allowedColumns[field];
//     if (!column) continue;

//     const filter = filters[field];
//     const operator = allowedOperators[filter.operator];
//     if (!operator) continue;

//     const paramName = `value${index}`;

//     if (operator === "ILIKE") {
//       values[paramName] = `%${filter.value}%`;
//     } else {
//       values[paramName] = filter.value;
//     }

//     conditions.push(`${column} ${operator} \${${paramName}}`);
//     index++;
//   }

//   if (conditions.length > 0) {
//     sql += ` WHERE ` + conditions.join(" AND ");
//   }

//   const result = await db.one(sql, values);

//   return Number(result.total);
// };




export const getProductList = async (columns) => {
  const { filterCategory, search, size = 10, offset = 0 } = columns;

  let sql = `
    SELECT p.*, c.category
    FROM products p
    INNER JOIN category c ON p.category_id = c.category_id
  `;

  if (filterCategory && search) {
    columns.search = `%${search}%`;
    sql += `
      WHERE ${filterCategory}::text ILIKE \${search}
      ORDER BY p.id DESC
      LIMIT \${size} OFFSET \${offset}
    `;
  } else {
    sql += `
      ORDER BY p.id DESC
      LIMIT \${size} OFFSET \${offset}
    `;
  }

  return db.manyOrNone(sql, columns);
};


export const getProductCount = async (columns) => {
  const { filterCategory, search } = columns;

  let sql = `
    SELECT COUNT(*) AS total
    FROM products p
    INNER JOIN category c ON p.category_id = c.category_id
  `;

  if (filterCategory && search) {
    columns.search = `%${search}%`;
    sql += ` WHERE ${filterCategory}::text ILIKE \${search}`;
  }

  const result = await db.one(sql, columns);
  return Number(result.total);
};


export const getProduct = async (id) => {
  let sql = `SELECT p.*, c.category FROM products p JOIN category c 
    on p.category_id = c.category_id WHERE id=${id} ORDER BY p.id DESC`;
  const result = await db.any(sql, id);
  return result;
};

export const getCategory = async () => {
  let sql = `SELECT * FROM category ORDER BY category_id ASC`;
  const result = await db.manyOrNone(sql);
  return result;
};

export const addProduct = async (columns) => {
  const { product_name, category_id, mrp, sp, cp, classification, size } =
    columns;
  let sql = `INSERT INTO products (product_name, category_id, mrp, sp, cp, classification, size)
    VALUES (\${product_name}, \${category_id}, \${mrp}, \${sp}, \${cp}, \${classification}, \${size})
    RETURNING *`;
  const result = await db.any(sql, columns);
  return result;
};

export const editProduct = async (id, columns) => {
  const { product_name, category_id, mrp, sp, cp, classification, size } =
    columns;
  let sql = `UPDATE products SET 
    product_name=\${product_name}, category_id=\${category_id}, mrp=\${mrp}, 
    sp=\${sp},  cp=\${cp}, classification=\${classification}, size=\${size}
    WHERE id=\${id} RETURNING *`;
  const result = await db.any(sql, {
    id,
    product_name,
    category_id,
    mrp,
    sp,
    cp,
    classification,
    size,
  });
  return result;
};

export const deleteProduct = async (id) => {
  const sql = `DELETE FROM products WHERE id = $1 RETURNING *`;
  const result = await db.any(sql, [id]);
  return result;
};
