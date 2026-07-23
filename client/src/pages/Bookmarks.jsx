import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import api from "../services/api";

function Bookmarks() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const res = await api.get("/users/bookmarks");
      setBlogs(res.data.blogs);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto py-10 px-5">
        <h1 className="text-4xl font-bold mb-8">
          My Bookmarks
        </h1>

        {loading ? (
          <h2>Loading...</h2>
        ) : blogs.length === 0 ? (
          <h2>No Bookmarked Blogs</h2>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Bookmarks;