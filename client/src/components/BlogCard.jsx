import { Link } from "react-router-dom";

function BlogCard({ blog }) {
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

      {/* Top Section */}
      <div className="p-6">

        {/* Title */}
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

        {/* Content */}
        <p className="text-gray-600 leading-7 line-clamp-4">
          {blog.content}
        </p>

        {/* Likes & Comments */}
        <div className="flex items-center gap-6 mt-5 text-gray-600 font-medium">
          <span>❤️ {blog.likes?.length || 0} Likes</span>
          <span>💬 {blog.comments?.length || 0} Comments</span>
        </div>

      </div>

      {/* Bottom */}
      <div className="px-6 pb-6">
        <Link
          to={`/blog/${blog._id}`}
          className="inline-flex items-center bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Read More
          <span className="ml-2">→</span>
        </Link>
      </div>

    </div>
  );
}

export default BlogCard;