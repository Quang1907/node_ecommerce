const express = require("express");
const { createBrand, updateBrand, deleteBrand, findBrand, getAllBrand } = require("../controllers/brandController");
const router = express.Router();

router.post("/", createBrand);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);
router.get("/", getAllBrand);
router.get("/:id", findBrand);

module.exports = router;