import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import RichTextEditor from "../components/RichTextEditor";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await api.get(`/blogs/${id}`);

      setForm({
        title: res.data.blog.title,
        content: res.data.blog.content,
      });
    } catch (err) {
      alert("Blog not found");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      await api.put(`/blogs/${id}`, form);

      alert("Blog updated successfully!");

      navigate(`/blog/${id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setUpdating(false);
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

      <div className="min-h-screen bg-slate-100 flex justify-center py-10 px-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">

          <h1 className="text-4xl font-bold mb-8">
            Edit Blog
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <div>
              <label className="block font-semibold mb-2">
                Blog Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block font-semibold mb-2">
                Blog Content
              </label>

              <RichTextEditor
                value={form.content}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    content: value,
                  }))
                }
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={updating}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {updating ? "Updating..." : "Update Blog"}
            </button>

          </form>

        </div>
      </div>
    </>
  );
}

export default EditBlog;