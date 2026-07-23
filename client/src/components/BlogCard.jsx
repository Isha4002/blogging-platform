import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-gray-100">

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