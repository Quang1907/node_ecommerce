const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const Category = require("../models/prdcategoryModel");

// create category product
const createCategory = asyncHandler(async (req, res) => {
    console.log(req.body);

    try {
        const category = await Category.create(req.body);
        console.log(category);

        res.json(category);
    } catch (error) {
        throw new Error(error);
    }
})
// update category product
const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updateCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateCategory);
    } catch (error) {
        throw new Error(error);
    }
})
// delete category product
const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteCategory = await Category.findByIdAndDelete(id);
        res.json(deleteCategory);
    } catch (error) {
        throw new Error(error);
    }
})
// find a category product
const findCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const findCategory = await Category.findById(id);
        res.json(findCategory);
    } catch (error) {
        throw new Error(error);
    }
})

// get all categories product
const getAllCategory = asyncHandler(async (req, res) => {
    try {
        const getAllCategory = await Category.find();
        res.json(getAllCategory);
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = { createCategory, updateCategory, deleteCategory, findCategory, getAllCategory };