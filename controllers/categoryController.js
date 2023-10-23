const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const { validateMongoDbId } = require("../utils/validateMongodbId");

const createCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.json(category);
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = { createCategory };