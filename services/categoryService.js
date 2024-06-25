const Category = require('../models/Category');

exports.createCategory = async (name) => {
    const category = new Category({ name });
    await category.save();
    return category;
};

exports.getAllCategories = async () => {
    return await Category.find();
};

exports.getCategoryById = async (categoryId) => {
    return await Category.findById(categoryId);
};

exports.updateCategory = async (categoryId, name) => {
    return await Category.findByIdAndUpdate(categoryId, { name }, { new: true });
};

exports.deleteCategory = async (categoryId) => {
    return await Category.findByIdAndDelete(categoryId);
};
