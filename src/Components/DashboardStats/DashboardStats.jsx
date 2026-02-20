import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMessageSquare, FiUser, FiTrendingUp } from 'react-icons/fi';
import useAdmin from '../../Hooks/useAdmin';

const DashboardStats = () => {
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

    const displayStats = isAdmin ? adminStats : stats;

    return (
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
    );
};

export default DashboardStats;
