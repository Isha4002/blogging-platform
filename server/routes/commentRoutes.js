const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addComment,
  getComments,
} = require("../controllers/commentController");

router.get("/:blogId", getComments);

router.post("/:blogId", authMiddleware, addComment);

module.exports = router;