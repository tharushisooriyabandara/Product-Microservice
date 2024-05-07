const Product = require("../database/models/Product");

const addProduct = async (req, res) => {
    try {
        const { name, desc, banner, type, unit, price } = req.body;

        const newProduct = new Product({
            name,
            desc,
            banner,
            type,
            unit,
            price
        });

        await newProduct.save();
        return res.status(201).json({
            message: "Product added successfully."
        });
    } catch (err) {
        return res.status(500).json({
            message: `${err.message}`
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        await Product.findByIdAndDelete(productId);
        return res.status(200).json({
            message: "Product deleted successfully."
        });
    } catch (err) {
        return res.status(500).json({
            message: `${err.message}`
        });
    }
}



const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, desc, banner, type, unit, price } = req.body;

        await Product.findByIdAndUpdate(productId, {
            name,
            desc,
            banner,
            type,
            unit,
            price
        });

        return res.status(200).json({
            message: "Product updated successfully."
        });
    } catch (err) {
        return res.status(500).json({
            message: `${err.message}`
        });
    }
}


const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found."
            });
        }

        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json({
            message: `${err.message}`
        });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json({
            message: `${err.message}`
        });
    }
}

module.exports = {
    addProduct,
    deleteProduct,
    updateProduct,
    getProductById,
    getAllProducts

};