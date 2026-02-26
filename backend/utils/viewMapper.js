export const mapToViewDTO = (dbRow) => {
  return {
    id: dbRow.id,
    productName: dbRow.product_name,
    categoryId: dbRow.category_id,
    mrp: dbRow.mrp,
    sp: dbRow.sp,
    cp: dbRow.cp,
    classification: dbRow.classification,
    size: dbRow.size,
    category: dbRow.category
  };
};
