const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const validateMongoDbId = (id => {
    const isValid = ObjectId.isValid(id);
    if (!isValid) throw new Error("This id is not valid or not found");
})

module.exports = validateMongoDbId;