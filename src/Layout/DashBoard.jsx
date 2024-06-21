import { CgProfile } from "react-icons/cg";
import { GiTargetPoster } from "react-icons/gi";
import { IoHomeSharp } from "react-icons/io5";
import { MdBugReport, MdManageAccounts } from "react-icons/md";
import { PiMemberOfBold } from "react-icons/pi";
import { RiProfileFill } from "react-icons/ri";
import { SiDeutschepost } from "react-icons/si";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import { GrAnnounce } from "react-icons/gr";

const DashBoard = () => {
    const [isAdmin] = useAdmin();

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-64 pl-10 pt-10 min-h-screen bg-[#3572EF]">
                <ul>
                    {isAdmin ? (
                        <>
                            <li>
                                <NavLink
                                    className="text-white p-2 rounded-xl flex items-center"
                                    to="/dashboard/adminprofile"
                                >
                                    <span className="mr-5"><CgProfile /></span>Admin Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="text-white p-2 rounded-xl flex items-center"
                                    to="/dashboard/manageusers"
                                >
                                    <span className="mr-5"><MdManageAccounts /></span>Manage Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="text-white p-2 rounded-xl flex items-center"
                                    to="/dashboard/reportedactivities"
                                >
                                    <span className="mr-5"><MdBugReport /></span>Reported Activities
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="text-white p-2 rounded-xl flex items-center"
                                    to="/dashboard/notification"
                                >
                                    <span className="mr-5"><GrAnnounce /></span>Make Announcement
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink
                                    className="text-white p-2 rounded-xl flex items-center"
                                    to="/dashboard/myProfile"
                                >
                                    <span className="mr-5"><RiProfileFill /></span>My Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="text-white p-2 rounded-xl flex items-center"
                                    to="/dashboard/addpost"
                                >
                                    <span className="mr-5"><GiTargetPoster /></span>Add Post
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="text-white p-2 rounded-xl flex items-center"
                                    to="/dashboard/mypost"
                                >
                                    <span className="mr-5"><SiDeutschepost /></span>My Post
                                </NavLink>
                            </li>
                        </>
                    )}

                    <div className="divider bg-white mr-10"></div>

                    <li>
                        <NavLink
                            className="text-white p-2 rounded-xl flex items-center"
                            to="/"
                        >
                            <span className="mr-5"><IoHomeSharp /></span>Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="text-white p-2 rounded-xl flex items-center"
                            to="/membership"
                        >
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
