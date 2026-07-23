const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getMyBlogs,
  likeBlog,
  getTrendingBlogs,
} = require("../controllers/blogController");

// Public Routes
router.get("/", getBlogs);
router.get("/trending", getTrendingBlogs);

// Protected Routes
router.get("/my", authMiddleware, getMyBlogs);

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createBlog
);

router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateBlog
);

router.put("/:id/like", authMiddleware, likeBlog);
router.delete("/:id", authMiddleware, deleteBlog);

// Keep this LAST
router.get("/:id", getBlogById);

module.exports = router;