const Comment = require("../models/Comment");

// Add Comment
const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Comment cannot be empty",
      });
    }

    const comment = await Comment.create({
      text,
      blog: req.params.blogId,
      author: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Blog Comments
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      blog: req.params.blogId,
    }).populate("author", "name");

    res.json({
      success: true,
      count: comments.length,
      comments,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addComment,
  getComments,
};