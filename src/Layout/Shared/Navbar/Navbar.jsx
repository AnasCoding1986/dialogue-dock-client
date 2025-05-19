import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoNotificationsSharp } from "react-icons/io5";
import useAuth from "../../../Hooks/useAuth";
import useAnnoucement from "../../../Hooks/useAnnoucement";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notification] = useAnnoucement();
  const navigate = useNavigate();

  // State to track current theme, for UI toggle feedback (optional)
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // On mount, load saved theme or fallback to light
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const toggleNavDropdown = () => {
    setNavDropdownOpen(!navDropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const navOptions = (
    <>
      <li className="md:mr-5">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-[#A7E6FF] font-bold" : "")}
        >
          Home
        </NavLink>
      </li>
      <li className="md:mr-5">
        <NavLink
          to="/membership"
          className={({ isActive }) => (isActive ? "text-[#A7E6FF] font-bold" : "")}
        >
          Membership
        </NavLink>
      </li>
      <li className="md:mr-5">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-[#A7E6FF]" : "")}
        >
          <button className="btn border-[#050C9C] bg-[#A7E6FF] btn-sm">
            <span className="font-bold text-xl text-[#050C9C]">
              <IoNotificationsSharp />
            </span>
            <div className="badge bg-[#050C9C] border-[#050C9C] badge-secondary">
              {notification.length}
            </div>
          </button>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed top-0 left-0 z-10 w-full bg-black bg-opacity-30 shadow-md">
      <div className="navbar max-w-7xl mx-auto text-white px-5">
        <div className="navbar-start">
          {/* Mobile Menu Toggle */}
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden" onClick={toggleNavDropdown}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </button>
            {navDropdownOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral text-neutral-content rounded-box w-52"
              >
                {navOptions}
              </ul>
            )}
          </div>
          {/* Logo */}
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-[#050C9C] ring-offset-base-100 ring-offset-2">
              <img src="/src/assets/images/logo.png.jpg" alt="Logo" />
            </div>
          </div>
          <Link className="btn btn-ghost text-xl font-Pacifico font-black" to="/">
            DialogueDock
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>

        <div className="navbar-end flex items-center space-x-3">
          {/* Dark/Light toggle button */}
          <button onClick={toggleTheme} className="btn btn-circle btn-sm">
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* Sun Icon */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m8.485-8.485l-.707.707M4.222 4.222l-.707.707M21 12h-1M4 12H3m16.485 4.485l-.707-.707M4.222 19.778l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* Moon Icon */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
                />
              </svg>
            )}
          </button>

          {user ? (
            <div className="relative">
              <div className="avatar" onClick={toggleProfileDropdown}>
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 cursor-pointer">
                  <img src={user?.photoURL} alt="User Profile" />
                </div>
              </div>
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-2 text-black">{user?.displayName}</div>
                  <Link to="/dashboard" className="block px-4 py-2 text-black hover:bg-gray-200">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link className="btn bg-[#A7E6FF] border-none" to="/login">
              Join Us
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
