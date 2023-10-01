const Product = require('../models/product');
const mongoose = require("mongoose");
const cloudinary = require('cloudinary').v2;

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0){
          return res.json({ message: 'There are no products' });
        }
        res.json(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

exports.createProduct = async (req, res) => {
    const {name, image, description, price, category, brand, stockQuantity} = req.body;

    if (!name || !image || !description || !price || !category || !brand || !stockQuantity) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
      const imageUploadResult = await cloudinary.uploader.upload(image);
      const imageUrl = imageUploadResult.secure_url;
      const product = new Product({
        name,
        image: imageUrl,
        description,
        price,
        category,
        brand,
        stockQuantity,
      });
  
      await product.save();
  
      res.status(200).json({ message: 'Product created successfully', product });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.editProduct = async (req, res) => {
    const productId = req.params.productid;

  try {
    const product = await Product.findById(productId);
  
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (req.body.name) {
      product.name = req.body.name;
    }
    if (req.body.image) {
      const imageUploadResult = await cloudinary.uploader.upload(req.body.image);
      const imageUrl = imageUploadResult.secure_url;
      product.image = imageUrl;
    }
    if (req.body.description) {
      product.description = req.body.description;
    }
    if (req.body.price) {
      product.price = req.body.price;
    }
    if (req.body.category) {
      product.category = req.body.category;
    }
    if (req.body.brand) {
      product.brand = req.body.brand;
    }
    if (req.body.stockQuantity) {
      product.stockQuantity = req.body.stockQuantity;
    }

    await product.save();

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.deleteProduct = async (req, res) => {
    const productId = req.params.productid; 
  
    try {
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      await product.deleteOne();
  
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };