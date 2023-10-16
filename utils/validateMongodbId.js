const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const validateMongoDbId = (id => {
    console.log(id);
    const isValid = ObjectId.isValid(id);
    if (!isValid) throw new Error("this id is not valid or not found");
})

module.exports = validateMongoDbId;