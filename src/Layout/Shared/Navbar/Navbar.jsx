import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { IoNotificationsSharp } from "react-icons/io5";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../../Hooks/useAuth";
import useAnnoucement from "../../../Hooks/useAnnoucement";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notification] = useAnnoucement();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  // On non-home pages, always use "scrolled" (dark text) style
  const useDarkText = scrolled || !isHome;

  // Scroll-driven navbar transition (smooth with rAF)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (profileDropdownOpen && !e.target.closest('.profile-dropdown')) {
        setProfileDropdownOpen(false);
      }
      if (notificationOpen && !e.target.closest('.notification-dropdown')) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [profileDropdownOpen, notificationOpen]);

  const handleLogout = () => {
    logOut()
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/membership", label: "Membership" },
    { to: "/about", label: "About" },
    { to: "/features", label: "Features" },
  ];

  const mobileMenuVariants = {
    closed: { x: "100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.08, duration: 0.3 },
    }),
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-50 w-full py-4 will-change-[background-color,box-shadow,backdrop-filter] ${useDarkText
          ? "navbar-scrolled"
          : ""
          }`}
        style={{
          transition: 'background-color 0.6s ease, box-shadow 0.6s ease, backdrop-filter 0.6s ease, border-color 0.6s ease',
        }}
      >
        {/* Subtle gradient line at bottom - appears on scroll */}
        <div
          className={`absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent transition-opacity duration-500 ${useDarkText ? "opacity-100" : "opacity-0"
            }`}
        />

        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          {/* Logo */}
          <Link className="flex items-center gap-2.5 group" to="/">
            <motion.div
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-0.5 will-change-transform"
              style={{
                transform: useDarkText ? 'scale(0.85)' : 'scale(1)',
                transition: 'transform 0.6s ease',
              }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <span className="font-montserrat font-bold text-primary text-xl">D</span>
              </div>
            </motion.div>
            <span
              className={`font-montserrat font-bold text-2xl will-change-[color,opacity] ${useDarkText
                ? "bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                : "text-white drop-shadow-lg"
                }`}
              style={{ transition: 'color 0.6s ease, opacity 0.6s ease' }}
            >
              DialogueDock
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""} ${useDarkText ? "text-gray-700" : "text-white/90 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Notification Bell */}
            <div className="relative ml-2 notification-dropdown">
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="p-2 group outline-none"
              >
                <IoNotificationsSharp className={`text-xl transition-colors ${useDarkText ? "text-gray-600 group-hover:text-secondary" : "text-white/80 group-hover:text-white"
                  } ${notification.length > 0 ? "bell-bounce" : ""}`} />
                {notification.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 flex items-center justify-center bg-secondary text-white text-[9px] font-bold rounded-full animate-pulse-glow">
                    {notification.length}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notificationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-glass-lg border border-gray-100 overflow-hidden z-50"
                  >
                    <div className="p-4 bg-gradient-to-r from-secondary/10 to-primary/10 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-bold text-primary text-sm font-montserrat">Announcements</h3>
                      <span className="text-[10px] bg-secondary/20 text-secondary px-2 py-0.5 rounded-full font-bold">
                        {notification.length} New
                      </span>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto py-1">
                      {notification.length > 0 ? (
                        notification.map((n) => (
                          <div key={n._id} className="p-4 hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors">
                            <div className="flex gap-3">
                              <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-sm">📣</span>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-bold text-gray-800 truncate mb-0.5">{n.title}</p>
                                <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">{n.description}</p>
                                <div className="mt-2 flex items-center gap-1.5">
                                  <div className="w-4 h-4 rounded-full overflow-hidden">
                                    <img
                                      src={n.photo}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(n.name || 'A')}&background=14b8a6&color=fff&bold=true&size=16`;
                                      }}
                                    />
                                  </div>
                                  <span className="text-[9px] text-gray-400">by {n.name}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                            <IoNotificationsSharp className="text-gray-300 text-xl" />
                          </div>
                          <p className="text-gray-400 text-xs">No new announcements</p>
                        </div>
                      )}
                    </div>
                    {notification.length > 0 && (
                      <Link
                        to="/#announcements"
                        onClick={() => setNotificationOpen(false)}
                        className="block w-full text-center py-3 text-[11px] font-bold text-secondary hover:bg-gray-50 border-t border-gray-100 transition-colors"
                      >
                        View All Announcements
                      </Link>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Create Post Button */}
            {user && (
              <Link
                to="/dashboard/addpost"
                className="btn-shimmer ml-3 bg-gradient-to-r from-secondary to-teal-400 text-white px-6 py-2 rounded-full text-sm font-bold shadow-glow-teal hover:shadow-glow-teal-lg transition-all duration-300 hover:scale-105"
              >
                + Create Post
              </Link>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="profile-dropdown relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="relative group"
                >
                  <div className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-300 ${useDarkText ? "border-secondary/50" : "border-white/50"
                    } group-hover:border-secondary group-hover:shadow-glow-teal`}>
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || user?.email || 'User')}&background=14b8a6&color=fff&bold=true`;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white font-bold text-lg">
                        {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                  {/* Online indicator */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                </button>

                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-glass-lg border border-gray-100 overflow-hidden z-50"
                    >
                      <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-gray-100">
                        <p className="font-bold text-primary text-sm truncate">{user?.displayName}</p>
                        <p className="text-gray-400 text-xs truncate">{user?.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-secondary/5 hover:text-secondary transition-colors"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/dashboard/myprofile"
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-secondary/5 hover:text-secondary transition-colors"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          My Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className={`btn-shimmer px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 ${scrolled
                  ? "bg-primary text-white shadow-lg hover:shadow-xl"
                  : "bg-white text-primary shadow-glass hover:shadow-glass-lg"
                  }`}
              >
                Join Us
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className={`lg:hidden p-2 rounded-xl transition-colors ${scrolled ? "text-primary hover:bg-gray-100" : "text-white hover:bg-white/10"
                }`}
              onClick={() => setMobileMenuOpen(true)}
            >
              <HiOutlineMenuAlt3 className="text-2xl" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay + Slide-in Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden flex flex-col"
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <span className="font-montserrat font-bold text-xl text-primary">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <HiX className="text-2xl text-gray-600" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <div className="flex-1 overflow-y-auto py-4">
                {navLinks.map((link, i) => (
                  <motion.div key={link.to} custom={i} variants={menuItemVariants} initial="closed" animate="open">
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `block px-6 py-3.5 text-base font-medium transition-colors ${isActive ? "text-secondary bg-secondary/5 border-r-4 border-secondary" : "text-gray-700 hover:text-secondary hover:bg-gray-50"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}

                {user && (
                  <motion.div custom={navLinks.length} variants={menuItemVariants} initial="closed" animate="open">
                    <NavLink
                      to="/dashboard/addpost"
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `block px-6 py-3.5 text-base font-medium transition-colors ${isActive ? "text-secondary bg-secondary/5 border-r-4 border-secondary" : "text-gray-700 hover:text-secondary hover:bg-gray-50"
                        }`
                      }
                    >
                      + Create Post
                    </NavLink>
                  </motion.div>
                )}

                <motion.div custom={navLinks.length + 1} variants={menuItemVariants} initial="closed" animate="open">
                  <a
                    href="/#announcements"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-6 py-3.5 text-base font-medium text-gray-700 hover:text-secondary hover:bg-gray-50 transition-colors"
                  >
                    <IoNotificationsSharp />
                    Announcements
                    {notification.length > 0 && (
                      <span className="bg-secondary text-white text-xs font-bold rounded-full px-2 py-0.5">
                        {notification.length}
                      </span>
                    )}
                  </a>
                </motion.div>
              </div>

              {/* Mobile Footer */}
              <div className="p-6 border-t border-gray-100">
                {user ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-secondary/30 flex-shrink-0">
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="Profile"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'U')}&background=14b8a6&color=fff&bold=true`;
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white font-bold">
                          {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm truncate">{user?.displayName}</p>
                      <Link
                        to="/dashboard"
                        className="text-secondary text-xs font-medium hover:underline"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Go to Dashboard →
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors"
                  >
                    Join Us
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
