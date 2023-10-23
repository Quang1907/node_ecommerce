const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

// route
const authRouter = require("./routes/authRouter");
const productRouter = require("./routes/productRouter");
const blogRouter = require("./routes/blogRouter");
const ProdCategoryRouter = require("./routes/prodCategoryRouter");
const BlogCategortRouter = require("./routes/blogCategoryRouter");
const brandRouter = require("./routes/brandRouter");

// PORT 
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// connect
dbConnect();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", ProdCategoryRouter);
app.use("/api/blogcategory", BlogCategortRouter);
app.use("/api/brand", brandRouter);

// middleware error handler and not foud
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});