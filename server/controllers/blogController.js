const Blog = require("../models/Blog");

// Create Blog
const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and Content are required",
      });
    }

    const blog = await Blog.create({
      title,
      content,
      author: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: blogs.length,
      blogs,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBlog,
  getBlogs,
};