import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/profile");
      setProfile(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20 text-2xl font-bold">
          Loading...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 py-10">
        <div className="max-w-5xl mx-auto">

          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-lg p-10">

            <div className="flex items-center gap-6">

              <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
                {profile.user.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <h1 className="text-4xl font-bold">
                  {profile.user.name}
                </h1>

                <p className="text-gray-500 mt-2">
                  {profile.user.email}
                </p>

                <p className="text-gray-400 mt-1">
                  Joined:{" "}
                  {new Date(profile.user.createdAt).toLocaleDateString()}
                </p>
              </div>

            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-2 gap-8 mt-10">

              <div className="bg-blue-50 rounded-2xl p-8 text-center">
                <h2 className="text-5xl font-bold text-blue-600">
                  {profile.totalBlogs}
                </h2>

                <p className="mt-3 text-gray-600">
                  Total Blogs
                </p>
              </div>

              <div className="bg-red-50 rounded-2xl p-8 text-center">
                <h2 className="text-5xl font-bold text-red-500">
                  {profile.totalLikes}
                </h2>

                <p className="mt-3 text-gray-600">
                  Total Likes
                </p>
              </div>

            </div>

          </div>

          {/* Recent Blogs */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

            <div className="flex justify-between items-center">

              <h2 className="text-3xl font-bold">
                Recent Blogs
              </h2>

              <Link
                to="/create"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                + Create Blog
              </Link>

            </div>

            {profile.blogs.length === 0 ? (

              <div className="text-center py-10 text-gray-500">
                No blogs yet.
              </div>

            ) : (

              <div className="space-y-5 mt-6">

                {profile.blogs.map((blog) => (

                  <div
                    key={blog._id}
                    className="border rounded-xl p-5 hover:bg-gray-50"
                  >
                    <h3 className="text-xl font-bold">
                      {blog.title}
                    </h3>

                    <p className="text-gray-500 mt-2">
                      ❤️ {blog.likes.length} Likes
                    </p>

                    <Link
                      to={`/blog/${blog._id}`}
                      className="text-blue-600 font-semibold mt-3 inline-block"
                    >
                      Read More →
                    </Link>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>
      </div>
    </>
  );
}

export default Profile;