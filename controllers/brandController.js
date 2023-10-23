const validateMongodbId = require("../utils/validateMongodbId");
const asyncHandler = require("express-async-handler");
const Brand = require("../models/brandModel");

// create category blog
const createBrand = asyncHandler(async (req, res) => {
    try {
        const createBrand = await Brand.create(req.body);
        res.json(createBrand);
    } catch (error) {
        throw new Error(error);
    }
})

// update category blog
const updateBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const updateBanrd = await Brand.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateBrand);
    } catch (error) {
        throw new Error(error);
    }
})

// delete category blog
const deleteBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const deleteBrand = await Brand.findByIdAndDelete(id);
        res.json(deleteBrand);
    } catch (error) {
        throw new Error(error);
    }
})

// find category blog
const findBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const findBrand = await Brand.findById(id);
        res.json(findBrand);
    } catch (error) {
        throw new Error(error);
    }
})

// getAll category blog
const getAllBrand = asyncHandler(async (req, res) => {
    try {
        const getAllBrand = await Brand.find();
        res.json(getAllBrand);
    } catch (error) {
        throw new Error(error);
    }
})


module.exports = { createBrand, updateBrand, deleteBrand, findBrand, getAllBrand };