
const { Product } = require("../models/index");
const { Op } = require('sequelize');

// Create a new product
const createProduct = async (req, res) => {
  const { name, price, description, category } = req.body;

  // Check for required fields
  if (!name || !price || !category) {
    return res.status(400).json({ error: 'Name, price, and category are required.' });
  }

  // Check data types
  if (typeof name !== 'string' || typeof category !== 'string') {
    return res.status(400).json({ error: 'Name and category must be strings.' });
  }
  if (typeof price !== 'number') {
    return res.status(400).json({ error: 'Price must be a number.' });
  }

  try {
    const product = await Product.create({ name, price, description, category });
    res.status(201).json(product);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.errors.map(err => err.message) });
    }
    res.status(500).json({ error: 'Failed to create product.' });
  }
};

// Get all products with pagination and search
const getAllProducts = async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  try {
    const products = await Product.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { category: { [Op.iLike]: `%${search}%` } }
        ]
      },
      limit,
      offset: (page - 1) * limit,
    });
    res.status(200).json({
      totalProducts: products.count,
      totalPages: Math.ceil(products.count / limit),
      currentPage: Number(page),
      products: products.rows,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products.' });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  // Check for valid ID format (assuming ID should be an integer)
  if (isNaN(id) || !Number.isInteger(Number(id))) {
    return res.status(400).json({ error: 'Invalid product ID format.' });
  }

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve product.' });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, category } = req.body;

  // Check for valid ID format
  if (isNaN(id) || !Number.isInteger(Number(id))) {
    return res.status(400).json({ error: 'Invalid product ID format.' });
  }

  // Check for required fields
  if (name && typeof name !== 'string') {
    return res.status(400).json({ error: 'Name must be a string.' });
  }
  if (category && typeof category !== 'string') {
    return res.status(400).json({ error: 'Category must be a string.' });
  }
  if (price && typeof price !== 'number') {
    return res.status(400).json({ error: 'Price must be a number.' });
  }

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.errors.map(err => err.message) });
    }
    res.status(500).json({ error: 'Failed to update product.' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  // Check for valid ID format
  if (isNaN(id) || !Number.isInteger(Number(id))) {
    return res.status(400).json({ error: 'Invalid product ID format.' });
  }

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    await product.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product.' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
