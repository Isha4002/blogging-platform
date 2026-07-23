import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-blue-600"
        >
          BlogHub
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-8">

          <Link
            to="/"
            className="font-medium text-gray-700 hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            to="/create"
            className="font-medium text-gray-700 hover:text-blue-600 transition"
          >
            Create Blog
          </Link>

          <Link
            to="/login"
            className="font-medium text-gray-700 hover:text-blue-600 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;