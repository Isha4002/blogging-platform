import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import SearchBar from "../components/SearchBar";
import api from "../services/api";
import Pagination from "../components/Pagination";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const res = await api.get(
  `/blogs?search=${search}&page=${currentPage}&limit=6`
);

setBlogs(res.data.blogs);
setTotalPages(res.data.totalPages);

      setBlogs(res.data.blogs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBlogs();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, currentPage]);

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      {/* ================= HERO ================= */}

      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white">

        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="text-center">

            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">

              Discover Amazing
              <br />

              Stories

            </h1>

            <p className="mt-8 text-xl text-blue-100 max-w-3xl mx-auto leading-9">

              Read blogs from developers, creators and students.
              Share your knowledge and inspire thousands of readers.

            </p>

            <div className="flex justify-center gap-5 mt-10">

              <Link
                to="/create"
                className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
              >
                ✍ Write a Blog
              </Link>

              <a
                href="#blogs"
                className="border border-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition"
              >
                📖 Explore Blogs
              </a>

            </div>

          </div>

          {/* Statistics */}

          <div className="grid md:grid-cols-3 gap-8 mt-20">

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">

              <h2 className="text-4xl font-bold">
                {blogs.length}+
              </h2>

              <p className="mt-2 text-blue-100">
                Published Blogs
              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">

              <h2 className="text-4xl font-bold">
                100+
              </h2>

              <p className="mt-2 text-blue-100">
                Active Readers
              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">

              <h2 className="text-4xl font-bold">
                20+
              </h2>

              <p className="mt-2 text-blue-100">
                Writers
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= SEARCH ================= */}

      <section className="-mt-10 relative z-20">

        <div className="max-w-5xl mx-auto px-6">

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

        </div>

      </section>

      {/* ================= BLOGS ================= */}

      <section
        id="blogs"
        className="max-w-7xl mx-auto px-6 py-20"
      >

        <div className="flex justify-between items-center mb-10">

          <h2 className="text-4xl font-bold text-gray-800">
            Latest Blogs
          </h2>

          <span className="text-gray-500">
            {blogs.length} Blogs
          </span>

        </div>

       {loading ? (

  <div className="text-center text-2xl font-semibold py-20">
    Loading...
  </div>

) : blogs.length === 0 ? (

  <div className="text-center text-gray-500 text-2xl py-20">
    No Blogs Found
  </div>

) : (

  <>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      {blogs.map((blog) => (
        <BlogCard
          key={blog._id}
          blog={blog}
        />
      ))}

    </div>

    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      setCurrentPage={setCurrentPage}
    />
  </>

)}

      </section>

      

      {/* ================= FOOTER ================= */}

      <footer className="bg-gray-900 text-white mt-20">

        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center">

          <h2 className="text-3xl font-bold">
            BlogHub
          </h2>

          <p className="text-gray-400 mt-4 md:mt-0">
            © 2026 BlogHub. Built with React, Node.js & MongoDB.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;