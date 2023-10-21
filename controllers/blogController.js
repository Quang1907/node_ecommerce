const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const validateMongoId = require("../utils/validateMongodbId");

// create blog
const createBlog = asyncHandler(async (req, res) => {
    try {
        const createBlog = await Blog.create(req.body);
        res.json(createBlog);
    } catch (error) {
        throw new Error(error);
    }
})

// update blog
const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoId(id);
    try {
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateBlog);
    } catch (error) {
        throw new Error(error);
    }
})

// delete blog
const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoId(id);
    try {
        const deleteBlog = await Blog.findByIdAndDelete(id);
        res.json(deleteBlog);
    } catch (error) {
        throw new Error(error);
    }
})

// find blog
const findBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoId(id);
    try {
        const findBlog = await Blog.findById(id);
        res.json(findBlog);
    } catch (error) {
        throw new Error(error);
    }
})

// get all blogs
const allBlogs = asyncHandler(async (req, res) => {
    try {
        const allBlogs = await Blog.find();
        res.json(allBlogs);
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = { createBlog, updateBlog, deleteBlog, findBlog, allBlogs };