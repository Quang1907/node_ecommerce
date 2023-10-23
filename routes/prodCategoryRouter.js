const express = require("express");
const { createCategory, updateCategory, deleteCategory, findCategory, getAllCategory } = require("../controllers/prodCategoryController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);
router.get("/", getAllCategory);
router.get("/:id", findCategory);

module.exports = router;