const productService = require('../services/productService');
const { errorResponse, validateProductData } = require('../utils/helpers');

exports.postProduct = async (req, res) => {
    try {
        validateProductData(req.body);
        const product = await productService.postProduct(req.user.id, req.body);
        res.status(201).json(product);
    } catch (error) {
        errorResponse(res, 400, error.message);
    }
};



exports.postProduct = async (req, res) => {
    try {
        console.log('req.user:', req.user);  // Debugging
        validateProductData(req.body);
        const product = await productService.postProduct(req.user._id, req.body);  // Use req.user._id
        res.status(201).json(product);
    } catch (error) {
        console.error('Error posting product:', error);  // Log the error details
        errorResponse(res, 400, error.message);
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        errorResponse(res, 400, error.message);
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return errorResponse(res, 404, 'Product not found');
        }
        res.status(200).json(product);
    } catch (error) {
        errorResponse(res, 400, error.message);
    }
};

exports.updateProduct = async (req, res) => {
    try {
        validateProductData(req.body);
        const product = await productService.updateProduct(req.params.id, req.body);
        if (!product) {
            return errorResponse(res, 404, 'Product not found');
        }
        res.status(200).json(product);
    } catch (error) {
        errorResponse(res, 400, error.message);
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await productService.deleteProduct(req.params.id);
        if (!product) {
            return errorResponse(res, 404, 'Product not found');
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        errorResponse(res, 400, error.message);
    }
};
