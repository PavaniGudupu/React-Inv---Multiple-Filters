export const getProductList = async ({ filters = {}, size = 10, offset = 0 }) => {

  let sql = `
    SELECT p.*, c.category
    FROM products p
    INNER JOIN category c ON p.category_id = c.category_id
  `;

  let conditions = [];

  for (let key in filters) {
    const filter = filters[key];

    const operator = filter.operator || "ilike";

    // Equal
    if (operator === "eq") {
      conditions.push(`${key} = '${filter.value}'`);
    }

    // Greater than
    if (operator === "gt") {
      conditions.push(`${key} > ${filter.value}`);
    }

    // Less than
    if (operator === "lt") {
      conditions.push(`${key} < ${filter.value}`);
    }

    // ILIKE (search)
    if (operator === "ilike") {
      conditions.push(`${key} ILIKE '%${filter.value}%'`);
    }
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  sql += ` ORDER BY p.id DESC LIMIT ${size} OFFSET ${offset}`;

  console.log("Final SQL:", sql); // for testing

  return db.manyOrNone(sql);
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