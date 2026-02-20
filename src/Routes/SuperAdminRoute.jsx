import { Navigate, useLocation } from "react-router-dom";
import useRole from "../Hooks/useRole";
import useAuth from "../Hooks/useAuth";

const SuperAdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { isSuperAdmin, isRoleLoading } = useRole();

    const location = useLocation();

    if (loading || isRoleLoading) {
        return <span className="loading loading-ball loading-lg"></span>;
    }

    if (user && isSuperAdmin) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SuperAdminRoute;
