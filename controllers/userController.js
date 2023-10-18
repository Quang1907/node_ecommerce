const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("./emailController");

// create user
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email }).exec();

    if (!findUser) {
        // create User
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        // User already exists
        throw new Error("User Already Exists");
    }
});

// login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not found
    const findUser = await User.findOne({ email });
    if (findUser && await findUser.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findUser?.id);
        const updateUser = await User.findByIdAndUpdate(
            findUser?.id,
            {
                refreshToken: refreshToken
            },
            { new: true }
        );
        res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 72 * 60 * 60 * 100 })
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            mobile: findUser?.mobile,
            email: findUser?.email,
            token: generateToken(findUser?._id)
        });
    } else {
        throw new Error("Invalid Credentials");
    }
});

// logout 
const logoutUser = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie) throw new Error("No refresh token in cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true, secure: true
        });
        return res.sendStatus(204); // forbidden
    }
    await User.findOneAndUpdate({ refreshToken }, {
        refreshToken: "",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true
    });
    return res.sendStatus(204); // forbidden
})

// handler refresh token 
const handlerRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie.refreshToken) throw new Error("No refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });

    if (!user) throw new Error("No Refresh token present in db or not matched");
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error("there is something wrong with refresh token");
        }
        const accessToken = generateToken(user._id);
        res.json({ accessToken });
    });
})

// get all users
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const getAllUsers = await User.find();
        res.json(getAllUsers);
    } catch (error) {
        throw new Error(error);
    }
})

// find user
const findUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const findUser = await User.findById(id);

        if (findUser) {
            res.json(findUser);
        }
    } catch (error) {
        throw new Error("Not found User");
    }
})

// update user
const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const updateUser = await User.findByIdAndUpdate(_id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            password: req?.body?.password,
            mobile: req?.body?.mobile,
            role: req?.body?.role,
        }, { new: true });
        res.json(updateUser);
    } catch (error) {
        throw new Error(error);
    }
})

// DELETE user
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteUser = await User.findByIdAndDelete(id);
        res.json(deleteUser);
    } catch (error) {
        throw new Error(erorr);
    }
})

// block user
const blockUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const block = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: true
            },
            {
                new: true
            }
        );
        res.json({
            message: "User Blocked"
        });
    } catch (error) {
        throw new Error(error);
    }
})

// unblock user
const unblockUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const unblock = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: false
            },
            {
                new: true
            }
        );
        res.json({
            message: "User UnBlocked"
        });
    } catch (error) {
        throw new Error(error);
    }
})

// update password 
const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongoDbId(_id);
    const user = await User.findById(_id);
    if (password) {
        user.password = password;
        const updatePassword = await user.save();
        res.json(updatePassword);
    } else {
        res.json(user);
    }
})

// forget password token
const forgetPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found with this email");
    try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetURL = `HI, please follow this link to reset your password, 
        this link is valid till 10 minutes from now 
        <a href="https://localhost:5000/api/user/reset-password/${token}">Click here</a>`;
        const data = {
            to: email,
            text: "Hey User",
            subject: "Forgot password link",
            html: resetURL
        }
        sendEmail(data);
        res.json(token);
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    findUser,
    deleteUser,
    updateUser,
    blockUser,
    unblockUser,
    handlerRefreshToken,
    logoutUser,
    updatePassword,
    forgetPasswordToken
};