const express = require("express");
const { createBlog, updateBlog, deleteBlog, findBlog, allBlogs, likeBlog, dislikeBlog } = require("../controllers/blogController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();


router.get("/", allBlogs);
router.post("/", authMiddleware, isAdmin, createBlog);
router.put("/likes", authMiddleware, isAdmin, likeBlog);
router.put("/dislikes", authMiddleware, isAdmin, dislikeBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id", findBlog);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

module.exports = router;