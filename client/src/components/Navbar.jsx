import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged Out Successfully!");

    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold text-blue-600"
        >
          BlogHub
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="hover:text-blue-600 font-medium"
          >
            Home
          </Link>

          {token ? (
            <>
              <>
  <Link
    to="/create"
    className="hover:text-blue-600 font-medium"
  >
    Create Blog
  </Link>

  <Link
    to="/dashboard"
    className="hover:text-blue-600 font-medium"
  >
    Dashboard
  </Link>
</>

              <span className="font-semibold text-gray-700">
                Hi, {user?.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-blue-600 font-medium"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;