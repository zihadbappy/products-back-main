const express = require("express");
const router = express.Router();
const { getProducts, createProduct, editProduct, deleteProduct } = require('../../controller/product');


router.get("/", getProducts);
router.post("/create", createProduct);
router.delete("/delete/:productid", deleteProduct);
router.patch("/edit/:productid", editProduct);

module.exports = router;