const categoryService = require('../services/categoryService');
const { errorResponse } = require('../utils/helpers');

exports.createCategory = async (req, res) => {
    try {
        const category = await categoryService.createCategory(req.body.name);
        res.status(201).json(category);
    } catch (error) {
        errorResponse(res, 400, error.message);
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        errorResponse(res, 400, error.message);
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const { category, products } = await categoryService.getCategoryById(req.params.id);
        res.status(200).json({ category, products });
    } catch (error) {
        errorResponse(res, 400, error.message);
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const category = await categoryService.updateCategory(req.params.id, req.body.name);
        if (!category) {
            return errorResponse(res, 404, 'Category not found');
        }
        res.status(200).json(category);
    } catch (error) {
        errorResponse(res, 400, error.message);
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await categoryService.deleteCategory(req.params.id);
        if (!category) {
            return errorResponse(res, 404, 'Category not found');
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        errorResponse(res, 400, error.message);
    }
};
