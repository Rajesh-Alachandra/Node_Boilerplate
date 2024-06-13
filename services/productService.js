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
