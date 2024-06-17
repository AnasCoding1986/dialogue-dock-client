import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Membership from "../Pages/Membership/Membership";
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
import AdminRoute from "./AdminRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Payment from "../Pages/Membership/Payment";
import SingleMsgDetails from "../Pages/Home/AllMsg/SingleMsgDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/membership',
                element: <Membership></Membership>
            },
            {
                path: '/payment',
                element: <Payment></Payment>
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
                path: '/allMsg/:id',
                element: <SingleMsgDetails></SingleMsgDetails>,
                loader: ({params}) => fetch(`http://localhost:5000/allMsg/${params.id}`)
            },
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
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

            // admin dashboard
            {
                path: '/dashboard/adminprofile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
            {
                path: '/dashboard/notification',
                element: <AdminRoute><AddNotification></AddNotification></AdminRoute>
            },
            {
                path: '/dashboard/manageusers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: '/dashboard/reportedactivities',
                element: <AdminRoute><ReportedActivities></ReportedActivities></AdminRoute>
            },
        ]
    }
]);