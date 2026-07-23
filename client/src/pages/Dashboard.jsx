import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchMyBlogs = async () => {
    try {
      const res = await api.get("/blogs/my");
      setBlogs(res.data.blogs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const totalLikes = blogs.reduce(
    (sum, blog) => sum + blog.likes.length,
    0
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 py-10">

        <div className="max-w-6xl mx-auto">

          {/* Welcome */}

          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-10 shadow-lg">

            <h1 className="text-4xl font-bold">
              Welcome, {user?.name} 👋
            </h1>

            <p className="mt-3 text-blue-100">
              Manage your blogs and track your activity.
            </p>

          </div>

          {/* Cards */}

          <div className="grid md:grid-cols-2 gap-8 mt-10">

            <div className="bg-white rounded-2xl shadow p-8 text-center">

              <h2 className="text-5xl font-bold text-blue-600">
                {blogs.length}
              </h2>

              <p className="mt-3 text-gray-600 text-lg">
                Total Blogs
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-8 text-center">

              <h2 className="text-5xl font-bold text-red-500">
                {totalLikes}
              </h2>

              <p className="mt-3 text-gray-600 text-lg">
                Total Likes
              </p>

            </div>

          </div>

          {/* Recent Blogs */}

          <div className="bg-white rounded-2xl shadow mt-10 p-8">

            <div className="flex justify-between items-center">

              <h2 className="text-3xl font-bold">
                Recent Blogs
              </h2>

              <Link
                to="/create"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                + Create Blog
              </Link>

            </div>

            {loading ? (

              <div className="text-center py-10 text-xl">
                Loading...
              </div>

            ) : blogs.length === 0 ? (

              <div className="text-center py-10 text-gray-500">
                No blogs created yet.
              </div>

            ) : (

              <div className="mt-6 space-y-5">

                {blogs.slice(0, 5).map((blog) => (

                  <div
                    key={blog._id}
                    className="border rounded-xl p-5 hover:bg-gray-50 transition"
                  >
                    <h3 className="text-xl font-bold">
                      {blog.title}
                    </h3>

                    <p className="text-gray-500 mt-2">
                      ❤️ {blog.likes.length} Likes
                    </p>

                    <Link
                      to={`/blog/${blog._id}`}
                      className="text-blue-600 font-semibold mt-3 inline-block"
                    >
                      Read More →
                    </Link>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;