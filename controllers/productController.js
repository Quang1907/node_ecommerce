const { default: slugify } = require("slugify");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// create product 
const createProduct = asyncHandler(async (req, res, next) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        throw new Error(error);
    }
});

// update product
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updateProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateProduct);
    } catch (error) {
        throw new Error(error);
    }
})

// findProduct
const findProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const findProduct = await Product.findById(id);
        res.json(findProduct);
    } catch (error) {
        throw new Error(error);
    }
})

// get all product
const getAllProduct = asyncHandler(async (req, res) => {
    try {
        // const product = await Product.where("category").equals(req.query.category);

        // filltering 
        // get api: localhost:5000/api/product/?price[gte]=110000&price[lte]=115000
        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach(el => {
            delete queryObj[el];
        });

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); // truy vấn nâng cao

        let query = Product.find(JSON.parse(queryStr));

        // sorting
        // get api: localhost:5000/api/product/?sort=category,-price
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        }

        // limiting the fields
        // get api: localhost:5000/api/product/?fields=category,price
        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        } else {
            query = query.select("-__v");
        }

        // pagination
        // get api: localhost:5000/api/product/?page=2&limit=10
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if (page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount) throw new Error("This page does not exists");
        }

        const product = await query;

        res.json(product);
    } catch (error) {
        throw new Error(error);
    }
})

// delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteProduct = await Product.findByIdAndDelete(id);
        res.json(deleteProduct);
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {
    createProduct,
    findProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
};