const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getMyBlogs,
  likeBlog,
} = require("../controllers/blogController");

// Public Routes
router.get("/", getBlogs);

// Protected Route (MUST come before /:id)
router.get("/my", authMiddleware, getMyBlogs);

// Public Route
router.get("/:id", getBlogById);

// Protected Routes
router.post("/", authMiddleware, createBlog);
router.put("/:id", authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);
router.put("/:id/like", authMiddleware, likeBlog);

module.exports = router;