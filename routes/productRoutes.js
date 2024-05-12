const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");

router.get("/", getProducts);
router.get("/category/:categoryName", getProductsByCategory);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router