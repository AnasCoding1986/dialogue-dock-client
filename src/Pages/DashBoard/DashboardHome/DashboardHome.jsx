import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiEdit, FiMessageSquare, FiUser, FiTrendingUp } from 'react-icons/fi';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { MdManageAccounts } from 'react-icons/md';
import useAuth from '../../../Hooks/useAuth';
import useAdmin from '../../../Hooks/useAdmin';
import { Helmet } from 'react-helmet-async';

const DashboardHome = () => {
    const { user } = useAuth();
    const [isAdmin] = useAdmin();

    const stats = [
        {
            title: 'Total Posts',
            value: '0',
            icon: FiMessageSquare,
            color: 'from-blue-500 to-blue-600',
            link: '/dashboard/mypost'
        },
        {
            title: 'Profile Views',
            value: '0',
            icon: FiTrendingUp,
            color: 'from-purple-500 to-purple-600',
            link: '/dashboard/myprofile'
        },
        {
            title: 'Active Discussions',
            value: '0',
            icon: FiMessageSquare,
            color: 'from-teal-500 to-teal-600',
            link: '/dashboard/mypost'
        },
    ];

    const adminStats = [
        {
            title: 'Total Users',
            value: '0',
            icon: FiUser,
            color: 'from-green-500 to-green-600',
            link: '/dashboard/manageusers'
        },
        {
            title: 'Reported Items',
            value: '0',
            icon: FiMessageSquare,
            color: 'from-red-500 to-red-600',
            link: '/dashboard/reportedactivities'
        },
        {
            title: 'Active Posts',
            value: '0',
            icon: FiTrendingUp,
            color: 'from-blue-500 to-blue-600',
            link: '/dashboard/adminprofile'
        },
    ];

    const quickActions = isAdmin ? [
        {
            title: 'Manage Users',
            description: 'View and manage user accounts',
            icon: MdManageAccounts,
            link: '/dashboard/manageusers',
            color: 'bg-gradient-to-br from-green-500 to-green-600'
        },
        {
            title: 'Make Announcement',
            description: 'Post important announcements',
            icon: BiMessageSquareAdd,
            link: '/dashboard/notification',
            color: 'bg-gradient-to-br from-purple-500 to-purple-600'
        },
    ] : [
        {
            title: 'Create Post',
            description: 'Share your thoughts with the community',
            icon: BiMessageSquareAdd,
            link: '/dashboard/addpost',
            color: 'bg-gradient-to-br from-secondary to-accent'
        },
        {
            title: 'My Posts',
            description: 'View and manage your posts',
            icon: FiMessageSquare,
            link: '/dashboard/mypost',
            color: 'bg-gradient-to-br from-primary to-blue-600'
        },
        {
            title: 'Edit Profile',
            description: 'Update your profile information',
            icon: FiEdit,
            link: '/dashboard/myprofile',
            color: 'bg-gradient-to-br from-purple-500 to-pink-500'
        },
    ];

    const displayStats = isAdmin ? adminStats : stats;

    return (
        <>
            <Helmet>
                <title>DialogueDock | Dashboard</title>
            </Helmet>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 mb-8 text-white shadow-xl"
                >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold font-montserrat mb-2">
                                Welcome back, {user?.displayName || 'User'}! 👋
                            </h1>
                            <p className="text-blue-100 text-lg">
                                {isAdmin ? 'Manage your platform from your admin dashboard' : 'Here\'s what\'s happening with your account'}
                            </p>
                        </div>
                        {user?.photoURL && (
                            <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden">
                                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {displayStats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link to={stat.link}>
                                <div className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <stat.icon className="text-4xl opacity-80" />
                                        <div className="text-right">
                                            <p className="text-sm opacity-90 font-medium">{stat.title}</p>
                                            <p className="text-3xl font-bold font-montserrat">{stat.value}</p>
                                        </div>
                                    </div>
                                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-white/40 rounded-full" style={{ width: '0%' }}></div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8"
                >
                    <h2 className="text-2xl font-bold font-montserrat text-primary mb-6 flex items-center gap-2">
                        <span className="text-secondary">⚡</span> Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quickActions.map((action, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link to={action.link}>
                                    <div className="group relative overflow-hidden rounded-xl border-2 border-gray-100 hover:border-secondary/30 transition-all duration-300 p-6 hover:shadow-lg">
                                        <div className={`absolute top-0 right-0 w-20 h-20 ${action.color} opacity-10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-300`}></div>
                                        <action.icon className={`text-4xl mb-3 bg-gradient-to-br ${action.color.replace('bg-gradient-to-br', '')} bg-clip-text text-transparent`} />
                                        <h3 className="text-lg font-bold text-primary mb-2">{action.title}</h3>
                                        <p className="text-gray-600 text-sm">{action.description}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Recent Activity Placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl p-6 md:p-8 shadow-lg"
                >
                    <h2 className="text-2xl font-bold font-montserrat text-primary mb-6 flex items-center gap-2">
                        <span className="text-secondary">📊</span> Recent Activity
                    </h2>
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📝</div>
                        <p className="text-gray-500 text-lg mb-2">No recent activity</p>
                        <p className="text-gray-400 text-sm mb-6">Start creating posts to see your activity here</p>
                        {!isAdmin && (
                            <Link to="/dashboard/addpost">
                                <button className="btn btn-primary px-8 rounded-full shadow-lg hover:shadow-primary/30 transition-all">
                                    Create Your First Post
                                </button>
                            </Link>
                        )}
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default DashboardHome;
