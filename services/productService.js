const Product = require('../models/Product');

exports.postProduct = async (userId, { name, description, price, category }) => {
    const product = new Product({
        name,
        description,
        price,
        user: userId,
        category,  // Added category
    });

    await product.save();
    return product;
};

exports.getAllProducts = async () => {
    return await Product.find().populate('user').populate('category');
};

exports.getProductById = async (productId) => {
    return await Product.findById(productId).populate('user').populate('category');
};

exports.updateProduct = async (productId, productData) => {
    return await Product.findByIdAndUpdate(productId, productData, { new: true }).populate('user').populate('category');
};

exports.deleteProduct = async (productId) => {
    return await Product.findByIdAndDelete(productId);
};

exports.getProductsByCategory = async (categoryId) => {
    return await Product.find({ category: categoryId }).populate('user').populate('category');
};
