import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import CommentSection from "../components/CommentSection";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // Current User
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  // Fetch Blog
 const fetchBlog = async () => {
  try {
    const res = await api.get(`/blogs/${id}`);

    // 👇 Ye line add karni hai
    console.log("Blog API Response:", res.data);

    setBlog(res.data.blog);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchBlog();
  }, []);

  // Check if logged-in user is author
  const isAuthor =
    blog &&
    currentUser &&
    (currentUser.id === blog.author?._id ||
      currentUser._id === blog.author?._id);

  console.log("Current User:", currentUser);
  console.log("Blog:", blog);
  console.log("Is Author:", isAuthor);

  // Delete Blog
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/blogs/${id}`);
      alert("Blog deleted successfully!");
      navigate("/");
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

  if (!blog) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20 text-2xl font-semibold text-red-500">
          Blog Not Found
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-10">
          <h1 className="text-5xl font-bold text-gray-800 mb-8">
            {blog.title}
          </h1>

          <div className="flex items-center mb-8">
            <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
              {blog.author?.name?.charAt(0).toUpperCase()}
            </div>

            <div className="ml-4">
              <h3 className="font-bold text-lg">{blog.author?.name}</h3>

              <p className="text-gray-500">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {isAuthor && (
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => navigate(`/edit/${blog._id}`)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg"
              >
                ✏️ Edit
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
              >
                🗑 Delete
              </button>
            </div>
          )}

          <div className="text-lg leading-9 text-gray-700 whitespace-pre-line">
            {blog.content}
          </div>

          <CommentSection blogId={blog._id} />
        </div>
      </div>
    </>
  );
}

export default BlogDetails;