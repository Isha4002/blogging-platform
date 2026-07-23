import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function CreateBlog() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/blogs", form);

      alert("Blog Published Successfully!");

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to publish blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 flex justify-center py-10 px-4">

        <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8">

          <h1 className="text-4xl font-bold mb-8">
            Create New Blog
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block font-semibold mb-2">
                Blog Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter blog title..."
                required
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Blog Content
              </label>

              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Write your blog here..."
                rows={12}
                required
                className="w-full border rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Publishing..." : "Publish Blog"}
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default CreateBlog;