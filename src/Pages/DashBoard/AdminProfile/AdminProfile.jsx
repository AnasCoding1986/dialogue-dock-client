import { useState, useEffect } from "react";
import useAllMsg from "../../../Hooks/useAllMsg";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiUsers, FiMessageSquare, FiMessageCircle } from "react-icons/fi";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#3572EF', '#14b8a6', '#f59e0b'];

const AdminProfile = () => {
    const [allMsg] = useAllMsg();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axiosSecure.get('/users');
                setUsers(res.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchComments = async () => {
            try {
                const res = await axiosSecure.get('/comments');
                setComments(res.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchUsers();
        fetchComments();
    }, [axiosSecure]);

    const allMsgCount = allMsg.length;
    const usersCount = users.length;
    const commentsCount = comments.length;

    const pieChartData = [
        { name: 'Posts', value: allMsgCount },
        { name: 'Users', value: usersCount },
        { name: 'Comments', value: commentsCount },
    ];

    const statCards = [
        { title: 'Total Posts', value: allMsgCount, icon: FiMessageSquare, color: 'from-blue-500 to-blue-600' },
        { title: 'Total Users', value: usersCount, icon: FiUsers, color: 'from-teal-500 to-teal-600' },
        { title: 'Total Comments', value: commentsCount, icon: FiMessageCircle, color: 'from-amber-500 to-amber-600' },
    ];

    return (
        <>
            <Helmet>
                <title>DialogueDock | Admin Profile</title>
            </Helmet>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold font-montserrat text-primary mb-2">
                        👤 Admin Profile
                    </h1>
                    <p className="text-gray-600 font-montserrat">
                        Your admin overview and platform statistics
                    </p>
                </motion.div>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
                >
                    <div className="flex items-center gap-5">
                        <div className="avatar">
                            <div className="w-16 h-16 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user.photoURL} alt="User Avatar" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold font-montserrat text-gray-800">
                                {user.displayName}
                            </h2>
                            <p className="text-gray-500 font-montserrat">{user.email}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {statCards.map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                                <stat.icon className="text-white text-xl" />
                            </div>
                            <p className="text-gray-500 text-sm font-montserrat mb-1">{stat.title}</p>
                            <p className="text-3xl font-bold font-montserrat text-gray-800">{stat.value.toLocaleString()}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Pie Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                    <h2 className="text-xl font-bold font-montserrat text-primary mb-4">
                        Platform Overview
                    </h2>
                    <div className="w-full h-80">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default AdminProfile;
