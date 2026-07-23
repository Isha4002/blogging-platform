import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
      <h2 className="text-2xl font-bold mb-2">
        {blog.title}
      </h2>

      <p className="text-gray-600 mb-4">
        {blog.content.substring(0, 120)}...
      </p>

      <p className="text-sm text-gray-500 mb-4">
        By {blog.author?.name}
      </p>

      <Link
        to={`/blog/${blog._id}`}
        className="text-blue-600 font-semibold"
      >
        Read More →
      </Link>
    </div>
  );
}

export default BlogCard;