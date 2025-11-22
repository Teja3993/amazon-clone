const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  // 1. Check if a keyword exists in the query (e.g., ?keyword=iphone)
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword, // Use Regex for partial match
          $options: 'i', // Case insensitive ('iPhone' matches 'iphone')
        },
      }
    : {};

  // 2. Pass the keyword filter to .find()
  const products = await Product.find({ ...keyword });

  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = { getProducts, getProductById };