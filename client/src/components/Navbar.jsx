import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full px-8 py-3 bg-gradient-to-r from-blue-50 via-white to-purple-50 shadow-md border-b flex items-center justify-between">
      {/* Left: App Name */}
      <Link
        to="/"
        className="text-2xl font-extrabold text-blue-700 tracking-tight flex items-center gap-2"
      >
        <span className="bg-blue-600 text-white px-2 py-1 rounded-lg shadow-sm">BR</span>
        <span className="hidden sm:inline">BookRepo</span>
      </Link>

      {/* Right: Controls */}
      <div className="flex items-center gap-6">
        <Link
          to="/library"
          className="text-base font-medium text-gray-700 hover:text-blue-700 transition flex items-center gap-1"
        >
          <span role="img" aria-label="library">📚</span>
          <span className="hidden sm:inline">MyLibrary</span>
        </Link>
        {user && (
          <>
            <span className="text-base text-gray-600 font-semibold hidden md:inline">
              Hello, <span className="text-blue-700">{user.user.name}</span>
            </span>
            <button
              onClick={handleLogout}
              className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white px-4 py-1.5 rounded-lg font-semibold shadow transition text-base"
            >
              Logout
            </button>
          </>
        )}
        {!user && (
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white px-4 py-1.5 rounded-lg font-semibold shadow transition text-base"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;