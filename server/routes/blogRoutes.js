const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createBlog,
  getBlogs,
} = require("../controllers/blogController");

// Public Route
router.get("/", getBlogs);

// Protected Route
router.post("/", authMiddleware, createBlog);

module.exports = router;