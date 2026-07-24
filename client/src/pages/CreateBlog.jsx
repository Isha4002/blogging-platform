import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import RichTextEditor from "../components/RichTextEditor";

function CreateBlog() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("content", form.content);

      if (image) {
        formData.append("image", image);
      }

      await api.post("/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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

            {/* Blog Title */}
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

            {/* Cover Image */}
            <div>
              <label className="block font-semibold mb-2">
                Cover Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="w-full border rounded-lg p-3"
              />

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-4 h-64 w-full object-cover rounded-lg"
                />
              )}
            </div>

            {/* Blog Content */}
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
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