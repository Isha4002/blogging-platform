import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import SearchBar from "../components/SearchBar";
import api from "../services/api";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/blogs?search=${search}`);

      setBlogs(res.data.blogs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchBlogs();
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      {/* Hero Section */}

      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Discover Amazing Stories
          </h1>

          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Read blogs from developers, creators and students.
            Share your knowledge with the world.
          </p>

        </div>

      </section>

      {/* Search */}

      <div className="max-w-5xl mx-auto px-6 mt-10">

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

      </div>

      {/* Blogs */}

      <div className="max-w-7xl mx-auto px-6 py-10">

        {loading ? (

          <div className="text-center text-2xl font-semibold">
            Loading blogs...
          </div>

        ) : blogs.length === 0 ? (

          <div className="text-center text-gray-500 text-xl">
            No Blogs Found
          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {blogs.map((blog) => (

              <BlogCard
                key={blog._id}
                blog={blog}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Home;