import useRole from "./useRole";

const useAdmin = () => {
    const { isAdmin, isRoleLoading } = useRole();
    return [isAdmin, isRoleLoading];
};

export default useAdmin;
