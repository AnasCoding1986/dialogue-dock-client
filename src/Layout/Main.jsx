import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Shared/Footer/Footer";
import Navbar from "./Shared/Navbar/Navbar";
import PostFAB from "../Components/PostFAB/PostFAB";

const Main = () => {
    const location = useLocation();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [location.pathname]);
    const noHeaderFooter = location.pathname.includes('/login') || location.pathname.includes('/signup') || location.pathname.includes('/payment');
    const isHome = location.pathname === '/';

    return (
        <div>
            {noHeaderFooter || <Navbar />}
            {/* No top padding on home so the hero extends behind the transparent navbar */}
            <div className={isHome ? "" : "pt-20"}>
                <Outlet />
            </div>
            {noHeaderFooter || <Footer />}
            {!noHeaderFooter && <PostFAB />}
        </div>
    );
};

export default Main;