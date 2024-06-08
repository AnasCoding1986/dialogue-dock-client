import { NavLink, Outlet } from "react-router-dom";


const DashBoard = () => {
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-[#3572EF]">
                <ul>
                    <li><NavLink to='/dashboard/myProfile'>My Profile</NavLink></li>
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;