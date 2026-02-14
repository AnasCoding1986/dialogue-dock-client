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
import Coding from "../Pages/Home/AllTags/Coding/Coding";
import Education from "../Pages/Home/AllTags/Education/Education";
import Entertainment from "../Pages/Home/AllTags/Entertainment/Entertainment";
import Environment from "../Pages/Home/AllTags/Environment/Environment";
import Fashion from "../Pages/Home/AllTags/Fashion/Fashion";
import Food from "../Pages/Home/AllTags/Food/Food";
import Health from "../Pages/Home/AllTags/Health/Health";
import Politics from "../Pages/Home/AllTags/Politics/Politics";
import Travel from "../Pages/Home/AllTags/Travel/Travel";
import About from "../Pages/About/About";
import Features from "../Pages/Features/Features";
import Pricing from "../Pages/Pricing/Pricing";
import FAQ from "../Pages/FAQ/FAQ";
import NotFound from "../Pages/NotFound/NotFound";


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
                path: '/coding',
                element: <Coding></Coding>
            },
            {
                path: '/education',
                element: <Education></Education>
            },
            {
                path: '/entertainment',
                element: <Entertainment></Entertainment>
            },
            {
                path: '/environment',
                element: <Environment></Environment>
            },
            {
                path: '/fashion',
                element: <Fashion></Fashion>
            },
            {
                path: '/food',
                element: <Food></Food>
            },
            {
                path: '/health',
                element: <Health></Health>
            },
            {
                path: '/politics',
                element: <Politics></Politics>
            },
            {
                path: '/travel',
                element: <Travel></Travel>
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
                path: '/faq',
                element: <FAQ></FAQ>
            },

            {
                path: '/allMsg/:id',
                element: <SingleMsgDetails></SingleMsgDetails>,
                loader: ({ params }) => fetch(`https://y-blush-three.vercel.app/allMsg/${params.id}`)
            },
            {
                path: '*',
                element: <NotFound></NotFound>
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