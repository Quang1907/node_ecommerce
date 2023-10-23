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
        const findBlog = await Blog.findById(id).populate("likes").populate("disLikes");
        const updateViews = await Blog.findByIdAndUpdate(id, { $inc: { numViews: 1 } }, { new: true })
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

// like Blog
const likeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoId(blogId);

    try {
        // Find  the blog which you want to be liked
        const blog = await Blog.findById(blogId);
        // find the login user
        const loginUserId = req.user?._id;
        // find if the user has liked the post
        const isLiked = blog?.isLiked;
        // find if the user has disliked the blog
        const alreadyDisliked = blog?.disLikes?.find(userId => userId?.toString() === loginUserId?.toString());
        if (alreadyDisliked) {
            await Blog.findByIdAndUpdate(blogId, {
                $pull: { disLikes: loginUserId },
                isDisLikes: false
            }, { new: true })
            res.json(blog);
        }
        if (isLiked) {
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $pull: { likes: loginUserId },
                isLiked: false,
            }, { new: true })
            res.json(blog);
        } else {
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $push: { likes: loginUserId },
                isLiked: true,
            }, { new: true })
            res.json(blog);
        }
    } catch (error) {
        throw new Error(error);
    }

})

//  dislikes
const dislikeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoId(blogId);
    try {
        // find the blog which you want to be liked
        const blog = await Blog.findById(blogId);
        // find the login user 
        const loginUserId = req.user?._id;
        // find if the user has dislike the blog
        const isDisLikes = blog?.isDisLikes;
        const alreadyLiked = blog?.likes?.find(userId => userId?.toString() === loginUserId?.toString());
        if (alreadyLiked) {
            await Blog.findByIdAndUpdate(blogId, {
                $pull: { likes: loginUserId },
                isLiked: false
            }, { new: true })
            res.json(blog);
        }
        if (isDisLikes) {
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $pull: { disLikes: loginUserId },
                isDisLikes: false
            }, { new: true })
            res.json(blog);

        } else {
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $push: { disLikes: loginUserId },
                isDisLikes: true
            }, { new: true })
            res.json(blog);
        }
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = { createBlog, updateBlog, deleteBlog, findBlog, allBlogs, likeBlog, dislikeBlog };