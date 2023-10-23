const validateMongodbId = require("../utils/validateMongodbId");
const asyncHandler = require("express-async-handler");
const BCategory = require("../models/blogCategoryModel");

// create category blog
const createCateBlog = asyncHandler(async (req, res) => {
    try {
        const createCateBlog = await BCategory.create(req.body);
        res.json(createCateBlog);
    } catch (error) {
        throw new Error(error);
    }
})

// update category blog
const updateCategoryBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const updateCategoryBlog = await BCategory.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateCategoryBlog);
    } catch (error) {
        throw new Error(error);
    }
})

// delete category blog
const deleteCategoryBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const deleteCategoryBlog = await BCategory.findByIdAndDelete(id);
        res.json(deleteCategoryBlog);
    } catch (error) {
        throw new Error(error);
    }
})

// find category blog
const findCategoryBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const findCategoryBlog = await BCategory.findById(id);
        res.json(findCategoryBlog);
    } catch (error) {
        throw new Error(error);
    }
})

// getAll category blog
const getAllCategoryBlog = asyncHandler(async (req, res) => {
    try {
        const getAllCategoryBlog = await BCategory.find();
        res.json(getAllCategoryBlog);
    } catch (error) {
        throw new Error(error);
    }
})


module.exports = { createCateBlog, updateCategoryBlog, deleteCategoryBlog, findCategoryBlog, getAllCategoryBlog };