const express = require("express");
const { createBlog, updateBlog, deleteBlog, findBlog, allBlogs } = require("../controllers/blogController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();


router.get("/", authMiddleware, isAdmin, allBlogs);
router.post("/", authMiddleware, isAdmin, createBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id", authMiddleware, isAdmin, findBlog);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

module.exports = router;