import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data, isPending: isRoleLoading } = useQuery({
        queryKey: [user?.email, 'userRole'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data;
        }
    });

    const role = data?.role || 'user';
    const isAdmin = data?.isAdmin || false;
    const isSuperAdmin = data?.isSuperAdmin || false;
    const isMember = data?.membership === 'member';

    return { role, isAdmin, isSuperAdmin, isMember, isRoleLoading };
};

export default useRole;
