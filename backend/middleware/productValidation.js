import { body, param } from "express-validator";

const productValidation = (isEdit = false) => [
  body("product_name")
    .trim()
    .notEmpty()
    .withMessage("Product Name is required")
    .isLength({ min: 2 })
    .withMessage("Product Name must be at least 2 characters"),

  body("category_id")
    .notEmpty()
    .withMessage("Category is required")
    .isInt()
    .withMessage("Category Id must be an integer"),

  body("mrp")
    .notEmpty()
    .withMessage("MRP is required")
    .isFloat({ gt: 0 })
    .withMessage("MRP must be greater than zero"),

  body("sp")
    .notEmpty()
    .withMessage("SP is required")
    .isFloat({ gt: 0 })
    .withMessage("SP must be greater than zero"),

  body("cp")
    .notEmpty()
    .withMessage("CP is required")
    .isFloat({ gt: 0 })
    .withMessage("CP must be greater than zero")
.custom((cp, { req }) => {
  const mrp = parseFloat(req.body.mrp);
  const sp = parseFloat(req.body.sp);
  const cpVal = parseFloat(cp);

  if (mrp <= sp || mrp <= cpVal) throw new Error("MRP must be greater than SP and CP");
  if (sp <= cpVal) throw new Error("SP must be greater than CP");
  return true;
})
,

  body("classification")
    .optional()
    .isString()
    .withMessage("Classification must be text"),

  body("size")
  .optional()
  .isString()
  .withMessage("Size must be text"),

    ...(isEdit
    ? [
        param("id")
          .isInt()
          .withMessage("Product Id must be Integer")
          .isInt({ gt: 0 })
          .withMessage("Product Id must be greater than zero")
          .notEmpty()
          .withMessage("Product Id required"),
      ]
    : []),
];

const product_id_validation = [
  param("id")
          .isInt()
          .withMessage("Product Id must be Integer")
          .isInt({ gt: 0 })
          .withMessage("Product Id must be greater than zero")
          .notEmpty()
          .withMessage("Product Id required"),
]

export const addProductValidation = productValidation(false);
export const editProductValidation = productValidation(true);
export const productIdValidation = product_id_validation;