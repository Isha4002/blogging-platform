const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

connectDB();

const app = express();

const authRoutes = require("./routes/authRoutes");

const blogRoutes = require("./routes/blogRoutes");

const commentRoutes = require("./routes/commentRoutes");

const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

app.use("/api/comments", commentRoutes);



app.get("/", (req, res) => {
    res.json({ message: "Blog API running..." });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});