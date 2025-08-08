const Product = require('../models/product.model');
const ProductImages = require('../models/productImages.model');

// Get product images by product id
exports.getAllProductImagesByProductId = async (productId) => {
    try {
        const productImages = await ProductImages.findOne({productId: productId, isDeleted: false}); 
        if(!productImages){
            throw new Error('Product images not found');
        }
        return productImages;
    } catch (error) {
        throw new Error('Error getting product images: ' + error.message);
    }
};

// Get product image by id
exports.getProductImageById = async (id) => {
    try {
        const productImage = await ProductImages.findOne({_id: id, isDeleted: false}); 
        if(!productImage){
            throw new Error('Product image not found');
        }
        return productImage;
    } catch (error) {
        throw new Error('Error getting product image by id: ' + error.message);
    }
};

// Create new product image
exports.createProductImage = async (request) => {
    try {
        const productImage = new ProductImages(request);

        const product = await Product.findOne({_id: request.productId, isDeleted: false}); 
        if(!product){
            throw new Error('Product not found');
        }

        const newProductImage = await productImage.save();

        return newProductImage;
    } catch (error) {
        throw new Error('Error creating product image: ' + error.message);
    }
};

// Update product image
exports.updateProductImage= async (id, request) => {
    try {
        const productImage = await ProductImages.findOne({ _id: id, isDeleted: { $ne: true } });
        if (!productImage) {
            throw new Error('Product image not found');
        }

        const product = await Product.findOne({ _id: request.productId, isDeleted: { $ne: true } });
        if (!product) {
            throw new Error('Product not found');
        }

        if (request.imageUrl) productImage.imageUrl = request.imageUrl;
        if (request.colorName) productImage.colorName = request.colorName;
        if (request.productId) productImage.productId = request.productId;

        return await productImage.save();
    } catch (error) {
        throw new Error('Error updating product image: ' + error.message);
    }
};

// Delete product image
exports.deleteProductImage = async (id) => {
    try {
        const productImage = await ProductImages.findOne({ _id: id, isDeleted: { $ne: true } });
        if (!productImage) {
            throw new Error('Product image not found');
        }

        productImage.isDeleted = true;
        await productImage.save();

        return { message: 'Product image deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting product image: ' + error.message);
    }
};