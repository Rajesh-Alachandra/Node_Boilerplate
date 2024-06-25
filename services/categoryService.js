const Category = require('../models/Category');
const Product = require('../models/Product');

exports.createCategory = async (name) => {
    const category = new Category({ name });
    await category.save();
    return category;
};

exports.getAllCategories = async () => {
    return await Category.find();
};

exports.getCategoryById = async (categoryId) => {
    const category = await Category.findById(categoryId);
    if (!category) {
        throw new Error('Category not found');
    }
    const products = await Product.find({ category: categoryId });
    return { category, products };
};

exports.updateCategory = async (categoryId, name) => {
    return await Category.findByIdAndUpdate(categoryId, { name }, { new: true });
};

exports.deleteCategory = async (categoryId) => {
    return await Category.findByIdAndDelete(categoryId);
};
