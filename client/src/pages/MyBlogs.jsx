import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function MyBlogs() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

const fetchMyBlogs = async () => {
  try {
    const res = await api.get("/blogs/my");

    console.log("Blogs Array:", res.data.blogs);
console.log("Blogs Length:", res.data.blogs.length);

    setBlogs(res.data.blogs);
console.log("State me jane wala:", res.data.blogs);

  } catch (err) {
    console.log("ERROR:", err);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/blogs/${id}`);

      setBlogs((prev) => prev.filter((blog) => blog._id !== id));

      alert("Blog deleted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20 text-2xl font-semibold">
          Loading...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 py-10 px-4">
        <div className="max-w-6xl mx-auto">

          <div className="flex justify-between items-center mb-8">

            <h1 className="text-4xl font-bold">
              My Blogs
            </h1>

            <button
              onClick={() => navigate("/create")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              + Create Blog
            </button>

          </div>

          {blogs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-10 text-center">

              <h2 className="text-2xl font-semibold mb-3">
                No Blogs Found
              </h2>

              <p className="text-gray-500">
                Create your first blog.
              </p>

            </div>
          ) : (
            <div className="grid gap-6">

              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white rounded-xl shadow-lg p-6"
                >

                  <h2 className="text-2xl font-bold mb-3">
                    {blog.title}
                  </h2>

                  <p className="text-gray-600 mb-6">
                    {blog.content.substring(0, 180)}...
                  </p>

                  <div className="flex gap-3">

                    <Link
                      to={`/blog/${blog._id}`}
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => navigate(`/edit/${blog._id}`)}
                      className="bg-yellow-500 text-white px-5 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="bg-red-600 text-white px-5 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default MyBlogs;