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
      <li className="md:mr-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-secondary rounded-lg px-4 py-2 transition-colors ${isActive ? "text-secondary font-bold" : "text-gray-600"}`
          }
        >
          Home
        </NavLink>
      </li>
      <li className="md:mr-2">
        <NavLink
          to="/membership"
          className={({ isActive }) =>
            `hover:text-secondary rounded-lg px-4 py-2 transition-colors ${isActive ? "text-secondary font-bold" : "text-gray-600"}`
          }
        >
          Membership
        </NavLink>
      </li>
      <li className="md:mr-2">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `hover:text-secondary rounded-lg px-4 py-2 transition-colors ${isActive ? "text-secondary font-bold" : "text-gray-600"}`
          }
        >
          About
        </NavLink>
      </li>
      <li className="md:mr-2">
        <NavLink
          to="/features"
          className={({ isActive }) =>
            `hover:text-secondary rounded-lg px-4 py-2 transition-colors ${isActive ? "text-secondary font-bold" : "text-gray-600"}`
          }
        >
          Features
        </NavLink>
      </li>
      <li className="md:mr-2">
        <NavLink
          to="/pricing"
          className={({ isActive }) =>
            `hover:text-secondary rounded-lg px-4 py-2 transition-colors ${isActive ? "text-secondary font-bold" : "text-gray-600"}`
          }
        >
          Pricing
        </NavLink>
      </li>
      <li className="md:mr-2">
        <NavLink
          to="/faq"
          className={({ isActive }) =>
            `hover:text-secondary rounded-lg px-4 py-2 transition-colors ${isActive ? "text-secondary font-bold" : "text-gray-600"}`
          }
        >
          FAQ
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          className="p-0"
        >
          <button className="btn btn-ghost btn-circle text-primary">
            <div className="indicator">
              <IoNotificationsSharp className="text-2xl" />
              <span className="badge badge-sm badge-secondary indicator-item border-none text-white">{notification.length}</span>
            </div>
          </button>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-base-100/80 backdrop-blur-md shadow-sm border-b border-base-200 transition-all duration-300">
      <div className="navbar max-w-7xl mx-auto text-primary px-5 py-3">
        <div className="navbar-start">
          {/* Mobile Menu Toggle */}
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden text-primary" onClick={toggleNavDropdown}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-box w-52 border border-gray-100"
              >
                {navOptions}
              </ul>
            )}
          </div>
          {/* Logo */}
          <Link className="flex items-center gap-2 group" to="/">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-0.5">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <span className="font-Discipline font-bold text-xl text-primary">D</span>
              </div>
            </div>
            <span className="text-2xl font-montserrat font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary group-hover:to-primary transition-all">
              DialogueDock
            </span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-medium">{navOptions}</ul>
        </div>

        <div className="navbar-end flex items-center space-x-4">
          {/* Dark/Light toggle button - commenting out until fully implemented
          <button onClick={toggleTheme} className="btn btn-circle btn-sm btn-ghost">
            {theme === "dark" ? (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m8.485-8.485l-.707.707M4.222 4.222l-.707.707M21 12h-1M4 12H3m16.485 4.485l-.707-.707M4.222 19.778l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" /></svg>
            )}
          </button>
           */}

          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online ring ring-secondary ring-offset-2 hover:ring-primary transition-all">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL} alt="User Profile" />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-gray-100">
                <li className="menu-title px-4 py-2 text-gray-400 text-xs uppercase font-bold tracking-wider">
                  {user?.displayName}
                </li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><button onClick={handleLogout} className="text-red-500">Log Out</button></li>
              </ul>
            </div>
          ) : (
            <Link className="btn btn-primary btn-sm px-6 rounded-full font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105" to="/login">
              Join Us
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
