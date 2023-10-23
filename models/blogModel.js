const mongoose = require('mongoose'); // Erase if already required

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Declare the Schema of the Mongo model
var blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    numViews: {
        type: Number,
        default: 0,
    },
    isLiked: {
        type: Boolean,
        default: false,
    },
    isDisLikes: {
        type: Boolean,
        default: false,
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    disLikes: [{
        type: ObjectId,
        ref: "User"
    }],
    author: {
        type: String,
        default: "Admin"
    },
    images: []
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true,
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);