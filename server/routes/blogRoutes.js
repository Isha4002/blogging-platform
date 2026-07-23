const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: "Protected route working",
        user: req.user,
    });
});

module.exports = router;