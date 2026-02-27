import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { GiTargetPoster } from "react-icons/gi";
import { IoHomeSharp, IoMenuSharp, IoCloseSharp } from "react-icons/io5";
import { MdBugReport, MdManageAccounts } from "react-icons/md";
import { PiMemberOfBold } from "react-icons/pi";
import { RiProfileFill } from "react-icons/ri";
import { SiDeutschepost } from "react-icons/si";
import { NavLink, Outlet, Link } from "react-router-dom";
import { GrAnnounce } from "react-icons/gr";
import { FiBarChart2, FiShield, FiLogOut } from "react-icons/fi";
import useRole from "../Hooks/useRole";
import useAuth from "../Hooks/useAuth";

const DashBoard = () => {
    const { isAdmin, isSuperAdmin } = useRole();
    const { user, logOut } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navLinkClass = ({ isActive }) =>
        `text-white p-3 rounded-xl flex items-center gap-3 transition-all duration-200 mb-1 text-sm ${isActive ? 'bg-white/20 font-bold shadow-lg' : 'hover:bg-white/10'}`;

    const handleLogout = () => {
        logOut().catch(err => console.log(err));
    };

    const sidebarContent = (
        <div className="flex flex-col h-full">
            {/* Logo Header */}
            <div className="p-6 pb-4">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <span className="font-bold text-xl text-white">D</span>
                    </div>
                    <span className="text-xl font-montserrat font-bold text-white">
                        DialogueDock
                    </span>
                </Link>
            </div>

            <div className="h-px bg-white/20 mx-4 mb-4"></div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-4">
                <ul>
                    {/* Dashboard Home */}
                    <li>
                        <NavLink className={navLinkClass} to="/dashboard" end>
                            <IoHomeSharp className="text-lg" /> Dashboard
                        </NavLink>
                    </li>

                    {/* ===== Super Admin Section ===== */}
                    {isSuperAdmin && (
                        <>
                            <li className="text-white/50 text-xs uppercase tracking-wider px-3 mb-1 mt-4 font-bold">
                                Super Admin
                            </li>
                            <li>
                                <NavLink className={navLinkClass} to="/dashboard/stats">
                                    <FiBarChart2 className="text-lg" /> Platform Stats
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={navLinkClass} to="/dashboard/manage-admins">
                                    <FiShield className="text-lg" /> Manage Admins
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* ===== Admin Section ===== */}
                    {isAdmin && (
                        <>
                            <li className="text-white/50 text-xs uppercase tracking-wider px-3 mb-1 mt-4 font-bold">
                                Admin
                            </li>
                            <li>
                                <NavLink className={navLinkClass} to="/dashboard/adminprofile">
                                    <CgProfile className="text-lg" /> Admin Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={navLinkClass} to="/dashboard/manageusers">
                                    <MdManageAccounts className="text-lg" /> Manage Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={navLinkClass} to="/dashboard/reportedactivities">
                                    <MdBugReport className="text-lg" /> Reported Activities
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={navLinkClass} to="/dashboard/manage-posts">
                                    <SiDeutschepost className="text-lg" /> Manage Posts
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={navLinkClass} to="/dashboard/notification">
                                    <GrAnnounce className="text-lg" /> Make Announcement
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* ===== User Section ===== */}
                    <li className="text-white/50 text-xs uppercase tracking-wider px-3 mb-1 mt-4 font-bold">
                        Account
                    </li>
                    <li>
                        <NavLink className={navLinkClass} to="/dashboard/myprofile">
                            <RiProfileFill className="text-lg" /> My Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={navLinkClass} to="/dashboard/addpost">
                            <GiTargetPoster className="text-lg" /> Add Post
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={navLinkClass} to="/dashboard/mypost">
                            <SiDeutschepost className="text-lg" /> My Posts
                        </NavLink>
                    </li>

                    <div className="h-px bg-white/15 my-3"></div>

                    <li>
                        <NavLink className={navLinkClass} to="/" end>
                            <IoHomeSharp className="text-lg" /> Back to Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={navLinkClass} to="/membership">
                            <PiMemberOfBold className="text-lg" /> Membership
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* User Info Footer */}
            <div className="p-4 border-t border-white/15">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 flex-shrink-0">
                        {user?.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt={user?.displayName || 'User'}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'U')}&background=fff&color=3572EF&bold=true&size=40`;
                                }}
                            />
                        ) : (
                            <div className="w-full h-full bg-white/20 flex items-center justify-center text-white font-bold">
                                {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-white text-sm font-semibold truncate">{user?.displayName || 'User'}</p>
                        <p className="text-white/50 text-xs truncate">{user?.email}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 justify-center text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-all text-sm"
                >
                    <FiLogOut /> Sign Out
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#3572EF] px-4 py-3 flex items-center justify-between shadow-lg">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="font-bold text-white">D</span>
                    </div>
                    <span className="text-lg font-montserrat font-bold text-white">DialogueDock</span>
                </Link>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                    {isSidebarOpen ? <IoCloseSharp className="text-2xl" /> : <IoMenuSharp className="text-2xl" />}
                </button>
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`
                fixed md:sticky top-0 left-0 z-40 h-screen w-72 bg-gradient-to-b from-[#3572EF] to-[#2557C5]
                transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
            `}>
                <div className="h-full pt-0 md:pt-0 mt-14 md:mt-0">
                    {sidebarContent}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 mt-14 md:mt-0">
                <Outlet />
            </div>
        </div>
    );
};

export default DashBoard;
