import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import CommentSection from "../components/CommentSection";

function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const res = await api.get(`/blogs/${id}`);

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

          {/* Content */}

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