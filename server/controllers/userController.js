const User = require("../models/User");
const Blog = require("../models/Blog");

// Toggle Bookmark
const toggleBookmark = async (req, res) => {
  try {
    const { blogId } = req.params;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const alreadyBookmarked = user.bookmarks.includes(blogId);

    if (alreadyBookmarked) {
      user.bookmarks = user.bookmarks.filter(
        (id) => id.toString() !== blogId
      );

      await user.save();

      return res.json({
        success: true,
        message: "Bookmark removed",
        bookmarked: false,
      });
    }

    user.bookmarks.push(blogId);

    await user.save();

    res.json({
      success: true,
      message: "Blog bookmarked",
      bookmarked: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Bookmarked Blogs
const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "bookmarks",
      populate: {
        path: "author",
        select: "name email",
      },
    });

    res.json({
      success: true,
      blogs: user.bookmarks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const checkBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      success: true,
      bookmarks: user.bookmarks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  toggleBookmark,
  getBookmarks,
  checkBookmark,
};