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
import AddPost from "../Pages/UserDashBoard/AddPost/AddPost";

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
            {
                path: '/allMsg',
                element: <AddPost></AddPost>
            },
        ]
    },
]);