const Product = require('../models/Product');

exports.postProduct = async (userId, { name, description, price }) => {
    const product = new Product({
        name,
        description,
        price,
        user: userId,
    });

    await product.save();
    return product;
};

exports.getAllProducts = async () => {
    return await Product.find().populate('user');
};

exports.getProductById = async (productId) => {
    return await Product.findById(productId).populate('user');
};

exports.updateProduct = async (productId, productData) => {
    return await Product.findByIdAndUpdate(productId, productData, { new: true });
};

exports.deleteProduct = async (productId) => {
    return await Product.findByIdAndDelete(productId);
};
