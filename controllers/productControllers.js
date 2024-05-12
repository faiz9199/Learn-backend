const Product = require("../models/productModel");

// GET Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products: products });
  } catch (error) {
    console.log("Error getting product", error);
    res.status(500).json({ message: "Error getting product" });
  }
};

// GET Products By Category
const getProductsByCategory = async (req, res) => {
  const categoryName = req.params.categoryName;

  try {
    const products = await Product.find({ category: categoryName });
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this category" });
    }
    res.status(200).json({ products: products });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Error fetching products by category" });
  }
};

// CREATE Product
const createProduct = async (req, res) => {
  const { name, description, price, category } = req.body;
  try {
    const newProduct = new Product({ name, description, price, category });
    const savedProduct = await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", product: savedProduct });
  } catch (error) {
    console.log("Error creating product", error);
    res.status(500).json({ message: "Error creating product" });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { name, price } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ messgae: "Product Updated", product: updatedProduct });
  } catch (error) {
    console.log("Error updating product", error);
    res.status(500).json({ message: "Error updating product" });
  }
};

// DELETE Product
const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
};

module.exports = {
  getProducts,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};
