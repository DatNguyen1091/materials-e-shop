const productImageService = require('../services/productImages.service');

// Get all product image
exports.getAll = async (req, res) => {
    try {
        const productImage = await productImageService.getAllProductImagesByProductId(req.params.id);
        res.json(productImage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get product image by ID
exports.getById = async (req, res) => {
    try {
        const fines = await productImageService.getProductImageById(req.params.id);
        res.json(fines);
    } catch (error) {
        if (error.message === 'Product image not found') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// Create new product image
exports.post = async (req, res) => {
    try {
        const newProductImage = await productImageService.createProductImage(req.body);
        res.status(201).json(newProductImage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update product image
exports.put = async (req, res) => {
    try {
        const updatedProductImage = await productImageService.updateProductImage(req.params.id, req.body);
        res.json(updatedProductImage);
    } catch (error) {
        if (error.message === 'Product image not found' || error.message === 'Product not found') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// Delete product image
exports.delete = async (req, res) => {
    try {
        const result = await productImageService.deleteProductImage(req.params.id);
        res.json(result);
    } catch (error) {
        if (error.message === 'Product image not found') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};