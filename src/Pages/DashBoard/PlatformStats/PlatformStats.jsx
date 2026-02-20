import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiUsers, FiMessageSquare, FiMessageCircle, FiShield, FiStar } from "react-icons/fi";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const COLORS = ['#3572EF', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6'];

const PlatformStats = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['platformStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/stats');
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="loading loading-spinner loading-lg text-primary"></div>
            </div>
        );
    }

    const statCards = [
        { title: 'Total Users', value: stats.totalUsers || 0, icon: FiUsers, color: 'from-blue-500 to-blue-600' },
        { title: 'Total Posts', value: stats.totalPosts || 0, icon: FiMessageSquare, color: 'from-teal-500 to-teal-600' },
        { title: 'Total Comments', value: stats.totalComments || 0, icon: FiMessageCircle, color: 'from-amber-500 to-amber-600' },
        { title: 'Total Admins', value: stats.totalAdmins || 0, icon: FiShield, color: 'from-purple-500 to-purple-600' },
        { title: 'Premium Members', value: stats.totalMembers || 0, icon: FiStar, color: 'from-rose-500 to-rose-600' },
    ];

    const userBreakdown = [
        { name: 'Regular Users', value: (stats.totalUsers || 0) - (stats.totalAdmins || 0) - (stats.totalMembers || 0) },
        { name: 'Admins', value: stats.totalAdmins || 0 },
        { name: 'Premium Members', value: stats.totalMembers || 0 },
    ].filter(item => item.value > 0);

    const barData = [
        { name: 'Users', count: stats.totalUsers || 0 },
        { name: 'Posts', count: stats.totalPosts || 0 },
        { name: 'Comments', count: stats.totalComments || 0 },
    ];

    return (
        <>
            <Helmet>
                <title>DialogueDock | Platform Stats</title>
            </Helmet>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold font-montserrat text-primary mb-2">📊 Platform Statistics</h1>
                    <p className="text-gray-600">Overview of your platform&apos;s performance and growth</p>
                </motion.div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
                    {statCards.map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                                <stat.icon className="text-white text-xl" />
                            </div>
                            <p className="text-gray-500 text-sm mb-1">{stat.title}</p>
                            <p className="text-3xl font-bold text-gray-800">{stat.value.toLocaleString()}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Pie Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                    >
                        <h2 className="text-xl font-bold text-primary mb-4">User Breakdown</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={userBreakdown}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                    outerRadius={100}
                                    dataKey="value"
                                >
                                    {userBreakdown.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Bar Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                    >
                        <h2 className="text-xl font-bold text-primary mb-4">Platform Overview</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#3572EF" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default PlatformStats;
