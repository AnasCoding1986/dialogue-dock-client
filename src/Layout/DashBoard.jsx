import { CgProfile } from "react-icons/cg";
import { GiTargetPoster } from "react-icons/gi";
import { IoHomeSharp } from "react-icons/io5";
import { MdBugReport, MdManageAccounts } from "react-icons/md";
import { PiMemberOfBold } from "react-icons/pi";
import { RiProfileFill } from "react-icons/ri";
import { SiDeutschepost } from "react-icons/si";
import { NavLink, Outlet } from "react-router-dom";
import { GrAnnounce } from "react-icons/gr";
import { FiBarChart2, FiShield } from "react-icons/fi";
import useRole from "../Hooks/useRole";

const DashBoard = () => {
    const { isAdmin, isSuperAdmin } = useRole();

    const navLinkClass = ({ isActive }) =>
        `text-white p-3 rounded-xl flex items-center transition-all duration-200 mb-2 ${isActive ? 'bg-white/20 font-bold shadow-lg' : 'hover:bg-white/10'}`;

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-64 pl-10 pt-10 min-h-screen bg-[#3572EF]">
                <ul>
                    {/* ===== Super Admin Section ===== */}
                    {isSuperAdmin && (
                        <>
                            <li className="text-white/60 text-xs uppercase tracking-wider px-3 mb-2 mt-2 font-bold">
                                Super Admin
                            </li>
                            <li>
                                <NavLink className={navLinkClass} to="/dashboard/stats">
                                    <span className="mr-5"><FiBarChart2 /></span>Platform Stats
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={navLinkClass} to="/dashboard/manage-admins">
                                    <span className="mr-5"><FiShield /></span>Manage Admins
                                </NavLink>
                            </li>
                            <div className="divider bg-white/30 mr-10 my-2"></div>
                        </>
                    )}

                    {/* ===== Admin Section ===== */}
                    {isAdmin && (
                        <>
                            <li className="text-white/60 text-xs uppercase tracking-wider px-3 mb-2 mt-2 font-bold">
                                Admin
                            </li>
                            <li>
                                <NavLink className={navLinkClass} to="/dashboard/adminprofile">
                                    <span className="mr-5"><CgProfile /></span>Admin Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={navLinkClass} to="/dashboard/manageusers">
                                    <span className="mr-5"><MdManageAccounts /></span>Manage Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={navLinkClass} to="/dashboard/reportedactivities">
                                    <span className="mr-5"><MdBugReport /></span>Reported Activities
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={navLinkClass} to="/dashboard/notification">
                                    <span className="mr-5"><GrAnnounce /></span>Make Announcement
                                </NavLink>
                            </li>
                            <div className="divider bg-white/30 mr-10 my-2"></div>
                        </>
                    )}

                    {/* ===== User Section ===== */}
                    <li className="text-white/60 text-xs uppercase tracking-wider px-3 mb-2 mt-2 font-bold">
                        User
                    </li>
                    <li>
                        <NavLink className={navLinkClass} to="/dashboard/myprofile">
                            <span className="mr-5"><RiProfileFill /></span>My Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={navLinkClass} to="/dashboard/addpost">
                            <span className="mr-5"><GiTargetPoster /></span>Add Post
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={navLinkClass} to="/dashboard/mypost">
                            <span className="mr-5"><SiDeutschepost /></span>My Post
                        </NavLink>
                    </li>

                    <div className="divider bg-white mr-10"></div>

                    <li>
                        <NavLink className={navLinkClass} to="/">
                            <span className="mr-5"><IoHomeSharp /></span>Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={navLinkClass} to="/membership">
                            <span className="mr-5"><PiMemberOfBold /></span>Membership
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default DashBoard;
