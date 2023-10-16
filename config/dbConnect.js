const { default: mongoose } = require("mongoose")

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("Database connected successfully"))
        .catch((error) => console.log("Connect error: ", error))
}

module.exports = dbConnect;