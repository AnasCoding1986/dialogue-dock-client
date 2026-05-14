import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import gold from "../../../assets/images/badge/goldBadge.jpg";
import silver from "../../../assets/images/badge/silverBadge.jpg";
import useRole from "../../../Hooks/useRole";


const ManageUsers = () => {

    const axiosSecure = useAxiosSecure();
    const { isSuperAdmin } = useRole();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is admin now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: err.response?.data?.message || "Could not make admin"
                });
            })
    }

    const handleRemoveAdmin = user => {
        Swal.fire({
            title: `Remove admin role?`,
            text: `${user.name} will be demoted to a regular user.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, remove"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/remove-admin/${user._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${user.name} is no longer an admin`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
                    .catch(err => {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: err.response?.data?.message || "Could not remove admin"
                        });
                    });
            }
        });
    };

    const getRoleBadge = (role) => {
        if (role === 'superadmin') return <span className="badge bg-purple-500 text-white border-none">Super Admin</span>;
        if (role === 'admin') return <span className="badge bg-[#3572EF] text-white border-none">Admin</span>;
        return <span className="badge bg-gray-200 text-gray-700 border-none">User</span>;
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-5 gap-2">
                <h2 className="text-xl sm:text-3xl font-bold text-primary">All Users</h2>
                <span className="text-sm sm:text-base text-gray-500">Total Users: <strong>{users.length}</strong></span>
            </div>
            
            {/* Mobile Card View */}
            <div className="md:hidden space-y-3 p-2">
                {users.map((user, index) => (
                    <div key={user._id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                        <div className="flex items-start justify-between mb-3 gap-2">
                            <div className="min-w-0">
                                <p className="font-semibold text-sm text-gray-800 line-clamp-1">{user.name}</p>
                                <p className="text-xs text-gray-400 truncate">{user.email}</p>
                            </div>
                            <div className="flex-shrink-0">
                                {getRoleBadge(user.role)}
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                            <div className="flex items-center gap-2">
                                {user.membership === "member" ? (
                                    <div className="avatar">
                                        <div className="w-7 rounded-full ring bg-[#3572EF] ring-offset-base-100 ring-offset-2">
                                            <img src={gold} alt="gold badge" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="avatar">
                                        <div className="w-7 rounded-full ring bg-[#3572EF] ring-offset-base-100 ring-offset-2">
                                            <img src={silver} alt="silver badge" />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                {user.role === 'superadmin' ? (
                                    <span className="text-gray-400 text-sm">Protected</span>
                                ) : user.role === 'admin' ? (
                                    isSuperAdmin ? (
                                        <button onClick={() => handleRemoveAdmin(user)} className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none">
                                            Demote
                                        </button>
                                    ) : (
                                        <span className="text-gray-400 text-sm">Admin</span>
                                    )
                                ) : (
                                    <button onClick={() => handleMakeAdmin(user)} className="btn btn-sm bg-[#3572EF] text-white border-none">
                                        <FaUsers className="text-white" /> Make Admin
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto p-2">
                <table className="table">
                    <thead className="bg-[#3572EF] text-white font-bold">
                        <tr>
                            <th>#</th>
                            <th>User name</th>
                            <th>User email</th>
                            <th>Role</th>
                            <th>Action</th>
                            <th>Subscription</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{getRoleBadge(user.role)}</td>
                                <td>
                                    {user.role === 'superadmin' ? (
                                        <span className="text-gray-400 text-sm">Protected</span>
                                    ) : user.role === 'admin' ? (
                                        isSuperAdmin ? (
                                            <button onClick={() => handleRemoveAdmin(user)} className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none">
                                                Demote
                                            </button>
                                        ) : (
                                            <span className="text-gray-400 text-sm">Admin</span>
                                        )
                                    ) : (
                                        <button onClick={() => handleMakeAdmin(user)} className="btn btn-sm bg-[#3572EF] text-white border-none">
                                            <FaUsers className="text-white" /> Make Admin
                                        </button>
                                    )}
                                </td>
                                <td>
                                    {
                                        user.membership === "member"
                                            ?
                                            <div className="avatar">
                                                <div className="w-7 rounded-full ring bg-[#3572EF] ring-offset-base-100 ring-offset-2">
                                                    <img src={gold} alt="gold badge" />
                                                </div>
                                            </div>
                                            :
                                            <div className="avatar">
                                                <div className="w-7 rounded-full ring bg-[#3572EF] ring-offset-base-100 ring-offset-2">
                                                    <img src={silver} alt="silver badge" />
                                                </div>
                                            </div>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
