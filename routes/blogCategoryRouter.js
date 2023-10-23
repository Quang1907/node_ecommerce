const express = require("express");
const { createCateBlog, updateCategoryBlog, deleteCategoryBlog, findCategoryBlog, getAllCategoryBlog } = require("../controllers/blogCategoryController");
const router = express.Router();

router.post("/", createCateBlog);
router.put("/:id", updateCategoryBlog);
router.delete("/:id", deleteCategoryBlog);
router.get("/", getAllCategoryBlog);
router.get("/:id", findCategoryBlog);

module.exports = router;