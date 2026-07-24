import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import CommentSection from "../components/CommentSection";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  const hasLiked = likes.includes(currentUser?.id);

  const fetchBlog = async () => {
    try {
      const res = await api.get(`/blogs/${id}`);

      setBlog(res.data.blog);
      setLikes(res.data.blog.likes || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const isAuthor =
    blog &&
    currentUser &&
    (currentUser.id === blog.author?._id ||
      currentUser._id === blog.author?._id);

  const handleLike = async () => {
    try {
      const res = await api.put(`/blogs/${id}/like`);

      if (hasLiked) {
        setLikes((prev) =>
          prev.filter((userId) => userId !== currentUser.id)
        );
      } else {
        setLikes((prev) => [...prev, currentUser.id]);
      }

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

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

          {/* Title */}
          <h1 className="text-5xl font-bold text-gray-800 mb-8">
            {blog.title}
          </h1>

          {/* Author */}
          <div className="flex items-center mb-8">
            <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
              {blog.author?.name?.charAt(0).toUpperCase()}
            </div>

            <div className="ml-4">
              <h3 className="font-bold text-lg">
                {blog.author?.name}
              </h3>

              <p className="text-gray-500">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Cover Image */}
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-[450px] object-cover rounded-2xl mb-8"
            />
          )}

          {/* Edit/Delete */}
          {isAuthor && (
            <div className="flex gap-4 mb-6">
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

          {/* Like */}
          <div className="flex items-center gap-4 mb-8">
            {currentUser ? (
              <button
                onClick={handleLike}
                className={`px-6 py-2 rounded-lg text-white ${
                  hasLiked
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-pink-500 hover:bg-pink-600"
                }`}
              >
                {hasLiked ? "❤️ Unlike" : "🤍 Like"}
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                Login to Like
              </button>
            )}

            <span className="text-lg font-semibold">
              ❤️ {likes.length} Likes
            </span>
          </div>

          {/* Blog Content */}
          <div
            className="prose prose-lg max-w-none mb-10"
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          />

          {/* Comments */}
          <CommentSection blogId={blog._id} />

        </div>
      </div>
    </>
  );
}

export default BlogDetails;