const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");

const {
  toggleBookmark,
  getBookmarks,
  checkBookmark,
} = require("../controllers/userController");

// Authentication
router.post("/register", registerUser);
router.post("/login", loginUser);

// Profile
router.get("/profile", authMiddleware, getProfile);

// Bookmark
router.put(
  "/bookmark/:blogId",
  authMiddleware,
  toggleBookmark
);

router.get(
  "/bookmarks",
  authMiddleware,
  getBookmarks
);

router.get(
  "/bookmark-status",
  authMiddleware,
  checkBookmark
);

module.exports = router;