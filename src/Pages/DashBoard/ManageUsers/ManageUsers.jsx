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
            <div className="flex justify-evenly my-5">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto p-2">
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
