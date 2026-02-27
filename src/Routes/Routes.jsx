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
import ManagePosts from "../Pages/DashBoard/ManagePosts/ManagePosts";
import ReportedActivities from "../Pages/DashBoard/ReportedActivities/ReportedActivities";
import AdminRoute from "./AdminRoute";
import SuperAdminRoute from "./SuperAdminRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Payment from "../Pages/Membership/Payment";
import SingleMsgDetails from "../Pages/Home/AllMsg/SingleMsgDetails";
import TagPage from "../Pages/Home/AllTags/TagPage";
import About from "../Pages/About/About";
import Features from "../Pages/Features/Features";
import Pricing from "../Pages/Pricing/Pricing";
import NotFound from "../Pages/NotFound/NotFound";
import DashboardHome from "../Pages/DashBoard/DashboardHome/DashboardHome";
import PlatformStats from "../Pages/DashBoard/PlatformStats/PlatformStats";
import ManageAdmins from "../Pages/DashBoard/ManageAdmins/ManageAdmins";


export const router = createBrowserRouter([
    {
        path: "/dashboard",
        element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children: [
            {
                index: true,
                element: <DashboardHome></DashboardHome>
            },
            {
                path: 'myprofile',
                element: <MyProfile></MyProfile>
            },
            {
                path: 'addpost',
                element: <AddPost></AddPost>
            },
            {
                path: 'mypost',
                element: <MyPost></MyPost>
            },

            // super admin dashboard
            {
                path: 'stats',
                element: <SuperAdminRoute><PlatformStats></PlatformStats></SuperAdminRoute>
            },
            {
                path: 'manage-admins',
                element: <SuperAdminRoute><ManageAdmins></ManageAdmins></SuperAdminRoute>
            },

            // admin dashboard
            {
                path: 'adminprofile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
            {
                path: 'notification',
                element: <AdminRoute><AddNotification></AddNotification></AdminRoute>
            },
            {
                path: 'manageusers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: 'reportedactivities',
                element: <AdminRoute><ReportedActivities></ReportedActivities></AdminRoute>
            },
            {
                path: 'manage-posts',
                element: <AdminRoute><ManagePosts></ManagePosts></AdminRoute>
            },
        ]
    },
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
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
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
                path: '/tags/:tagName',
                element: <TagPage></TagPage>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/features',
                element: <Features></Features>
            },
            {
                path: '/pricing',
                element: <Pricing></Pricing>
            },

            {
                path: '/allMsg/:id',
                element: <SingleMsgDetails></SingleMsgDetails>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/allMsg/${params.id}`)
            },
            {
                path: '*',
                element: <NotFound></NotFound>
            },
        ]
    },
]);