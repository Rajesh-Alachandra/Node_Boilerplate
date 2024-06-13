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
