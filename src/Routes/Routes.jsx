import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Membership from "../Pages/Home/Membership/Membership";
import Login from "../Pages/Home/Login/Login";
import SignUp from "../Pages/Home/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import AddNotification from "../Pages/AdminDashBoard/AddNotification/AddNotification";
import DashBoard from "../Layout/DashBoard";
import AddPost from "../Pages/DashBoard/AddPost/AddPost";
import MyProfile from "../Pages/DashBoard/MyProfile/MyProfile";
import MyPost from "../Pages/DashBoard/MyPost/MyPost";
import AdminProfile from "../Pages/DashBoard/AdminProfile/AdminProfile";
import ManageUsers from "../Pages/DashBoard/ManageUsers/ManageUsers";
import ReportedActivities from "../Pages/DashBoard/ReportedActivities/ReportedActivities";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/membership',
                element: <PrivateRoute><Membership></Membership></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/notification',
                element: <AddNotification></AddNotification>
            },
        ]
    },
    {
        path: "dashboard",
        element: <DashBoard></DashBoard>,
        children: [
            {
                path: '/dashboard/myprofile',
                element: <MyProfile></MyProfile>
            },
            {
                path: '/dashboard/addpost',
                element: <AddPost></AddPost>
            },
            {
                path: '/dashboard/mypost',
                element: <MyPost></MyPost>
            },
            {
                path: '/dashboard/adminprofile',
                element: <AdminProfile></AdminProfile>
            },
            {
                path: '/dashboard/manageusers',
                element: <ManageUsers></ManageUsers>
            },
            {
                path: '/dashboard/reportedactivities',
                element: <ReportedActivities></ReportedActivities>
            },
        ]
    }
]);