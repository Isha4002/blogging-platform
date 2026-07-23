import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function BlogCard({ blog }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchBookmarkStatus();
  }, []);

  const fetchBookmarkStatus = async () => {
    try {
      const res = await api.get("/users/bookmark-status");

      const bookmarks = res.data.bookmarks || [];

      setSaved(bookmarks.includes(blog._id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleBookmark = async () => {
    try {
      const res = await api.put(`/users/bookmark/${blog._id}`);

      setSaved(res.data.bookmarked);

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Bookmark failed");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-gray-100">

      {/* Cover Image */}
      <img
        src={
          blog.image ||
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200"
        }
        alt={blog.title}
        className="w-full h-56 object-cover"
      />

      {/* Content */}
      <div className="p-6">

        <h2 className="text-2xl font-bold text-gray-800 line-clamp-2">
          {blog.title}
        </h2>

        {/* Author */}
        <div className="flex items-center mt-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
            {blog.author?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="ml-3">
            <p className="font-semibold text-gray-700">
              {blog.author?.name}
            </p>

            <p className="text-sm text-gray-500">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <p className="text-gray-600 leading-7 line-clamp-4">
          {blog.content}
        </p>

        {/* Likes & Comments */}
        <div className="flex items-center gap-6 mt-5 text-gray-600 font-medium">
          <span>❤️ {blog.likes?.length || 0} Likes</span>
          <span>💬 {blog.comments?.length || 0} Comments</span>
        </div>

      </div>

      {/* Bottom Buttons */}
      <div className="px-6 pb-6 flex justify-between items-center">

        <button
          onClick={handleBookmark}
          className={`px-4 py-2 rounded-lg text-white transition ${
            saved
              ? "bg-green-600 hover:bg-green-700"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
        >
          {saved ? "⭐ Saved" : "🔖 Save"}
        </button>

        <Link
          to={`/blog/${blog._id}`}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Read More →
        </Link>

      </div>

    </div>
  );
}

export default BlogCard;