const express = require("express");
const { createUser,
    loginUser,
    getAllUsers,
    findUser,
    deleteUser,
    updateUser,
    unblockUser,
    blockUser,
    handlerRefreshToken,
    logoutUser,
    updatePassword,
    forgetPasswordToken,
    resetPassword
} = require("../controllers/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.put("/password", authMiddleware, updatePassword);
router.post("/forgot-password-token", authMiddleware, forgetPasswordToken);
router.put("/reset-password/:token", resetPassword)

router.get("/refresh", handlerRefreshToken);
router.get("/all-users", getAllUsers);
router.get("/:id", authMiddleware, isAdmin, findUser);
router.delete("/:id", deleteUser);
router.put("/edit", authMiddleware, updateUser);
router.patch("/block/:id", authMiddleware, isAdmin, blockUser);
router.patch("/unblock/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;