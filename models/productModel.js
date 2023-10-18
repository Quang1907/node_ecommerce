const mongoose = require('mongoose'); // Erase if already required

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Declare the Schema of the Mongo model
var productSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        // ref: "Category"
    },
    brand: {
        type: String,
        required: true,
        // enum: ["Samsung", "Apple", "Lenovo"]
    },
    sold: {
        type: Number,
        default: 0,
    },
    quantity: {
        type: Number,
        required: true
    },
    images: {
        type: Array,
    },
    color: {
        type: String,
        required: true,
        // enum: ["Black", "Brown", "Red"]
    },
    ratings: [{
        star: Number,
        postedby: { type: ObjectId, ref: "User" }
    }]
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Product', productSchema);