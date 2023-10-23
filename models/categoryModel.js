const mongoose = require('mongoose'); // Erase if already required
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Declare the Schema of the Mongo model
var categorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Category', categorySchema);