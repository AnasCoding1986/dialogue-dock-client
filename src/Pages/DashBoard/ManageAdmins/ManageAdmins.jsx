import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FiShield, FiUserX, FiUser } from "react-icons/fi";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import gold from "../../../assets/images/badge/goldBadge.jpg";
import silver from "../../../assets/images/badge/silverBadge.jpg";

const ManageAdmins = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    // Filter to show only admins
    const admins = users.filter(user => user.role === 'admin');
    const superAdmins = users.filter(user => user.role === 'superadmin');

    const handleRemoveAdmin = (user) => {
        Swal.fire({
            title: `Remove admin role?`,
            text: `${user.name} will be demoted to a regular user.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, remove admin"
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
                            text: err.response?.data?.message || "Could not remove admin role"
                        });
                    });
            }
        });
    };

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: `Promote to Admin?`,
            text: `${user.name} will be promoted to an admin.`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3572EF",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, promote"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${user.name} is now an admin`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
                    .catch(err => {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: err.response?.data?.message || "Could not promote user"
                        });
                    });
            }
        });
    };

    // Regular users that can be promoted
    const regularUsers = users.filter(user => !user.role || user.role === 'user');

    return (
        <>
            <Helmet>
                <title>DialogueDock | Manage Admins</title>
            </Helmet>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold font-montserrat text-primary mb-2">🛡️ Manage Admins</h1>
                    <p className="text-gray-600">Promote or demote admin roles — Super Admin exclusive</p>
                </motion.div>

                {/* Super Admins Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
                >
                    <h2 className="text-xl font-bold text-purple-600 mb-4 flex items-center gap-2">
                        <FiShield /> Super Admins ({superAdmins.length})
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead className="bg-purple-500 text-white font-bold">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Membership</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {superAdmins.map((user, index) => (
                                    <tr key={user._id} className="hover:bg-purple-50">
                                        <th>{index + 1}</th>
                                        <td className="font-medium">{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <div className="avatar">
                                                <div className="w-7 rounded-full ring ring-offset-base-100 ring-offset-2">
                                                    <img src={user.membership === 'member' ? gold : silver} alt="badge" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge badge-primary bg-purple-500 border-purple-500 text-white">
                                                Super Admin
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Current Admins Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
                >
                    <h2 className="text-xl font-bold text-blue-600 mb-4 flex items-center gap-2">
                        <FiShield /> Current Admins ({admins.length})
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead className="bg-[#3572EF] text-white font-bold">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Membership</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center text-gray-400 py-8">
                                            No admins found. Promote users from the section below.
                                        </td>
                                    </tr>
                                ) : (
                                    admins.map((user, index) => (
                                        <tr key={user._id} className="hover:bg-blue-50">
                                            <th>{index + 1}</th>
                                            <td className="font-medium">{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <div className="avatar">
                                                    <div className="w-7 rounded-full ring ring-offset-base-100 ring-offset-2">
                                                        <img src={user.membership === 'member' ? gold : silver} alt="badge" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleRemoveAdmin(user)}
                                                    className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none gap-1"
                                                >
                                                    <FiUserX /> Demote
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Regular Users — Promote Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                >
                    <h2 className="text-xl font-bold text-teal-600 mb-4 flex items-center gap-2">
                        <FiUser /> Regular Users ({regularUsers.length}) — Promote to Admin
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead className="bg-teal-500 text-white font-bold">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Membership</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {regularUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center text-gray-400 py-8">
                                            All users have been promoted.
                                        </td>
                                    </tr>
                                ) : (
                                    regularUsers.map((user, index) => (
                                        <tr key={user._id} className="hover:bg-teal-50">
                                            <th>{index + 1}</th>
                                            <td className="font-medium">{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <div className="avatar">
                                                    <div className="w-7 rounded-full ring ring-offset-base-100 ring-offset-2">
                                                        <img src={user.membership === 'member' ? gold : silver} alt="badge" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleMakeAdmin(user)}
                                                    className="btn btn-sm bg-[#3572EF] hover:bg-blue-700 text-white border-none gap-1"
                                                >
                                                    <FiShield /> Promote
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default ManageAdmins;
