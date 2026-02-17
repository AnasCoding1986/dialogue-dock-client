import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { FiMail, FiAward, FiMessageSquare } from "react-icons/fi";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import gold from "../../../assets/images/badge/goldBadge.jpg";
import silver from "../../../assets/images/badge/silverBadge.jpg";
import useAllMsg from "../../../Hooks/useAllMsg";
import SingleMsg from "../../Home/AllMsg/SingleMsg";

const MyProfile = () => {

    const [allMsg] = useAllMsg();
    const { user } = useAuth();

    const myPosts = allMsg.filter(myPost => myPost.email === user.email);

    // Sort posts by createdAt date in descending order and slice the first three
    const recentPosts = myPosts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

    const axiosSecure = useAxiosSecure();

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    // Find the current user's data from the list of users
    const currentUser = users.find(u => u.email === user.email);

    return (
        <>
            <Helmet>
                <title>DialogueDock | My Profile</title>
            </Helmet>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
                >
                    {/* Cover Background */}
                    <div className="h-32 bg-gradient-to-r from-primary to-secondary"></div>

                    {/* Profile Info */}
                    <div className="px-6 pb-6">
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16">
                            {/* Avatar */}
                            <div className="avatar">
                                <div className="w-32 h-32 rounded-full ring-4 ring-white shadow-xl bg-white overflow-hidden">
                                    {user?.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user?.displayName || 'User'}
                                            className="object-cover w-full h-full"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                const fallback = document.createElement('div');
                                                fallback.className = 'w-full h-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white font-bold text-4xl';
                                                fallback.textContent = user?.displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U';
                                                e.target.parentElement.appendChild(fallback);
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white font-bold text-4xl">
                                            {user?.displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                                    <h1 className="text-3xl font-bold font-montserrat text-primary">
                                        {user?.displayName || 'User'}
                                    </h1>
                                    {/* Badge */}
                                    {currentUser && (
                                        <div className="flex items-center justify-center md:justify-start gap-2">
                                            <div className="avatar">
                                                <div className="w-8 h-8 rounded-full ring-2 ring-secondary shadow-md">
                                                    <img
                                                        src={currentUser.membership === "member" ? gold : silver}
                                                        alt={currentUser.membership === "member" ? "Gold Badge" : "Silver Badge"}
                                                    />
                                                </div>
                                            </div>
                                            <span className="text-sm font-semibold text-secondary uppercase tracking-wide">
                                                {currentUser.membership === "member" ? "Premium Member" : "Free Member"}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                                    <FiMail className="text-secondary" />
                                    <p>{user?.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Total Posts</p>
                                        <p className="text-3xl font-bold text-blue-600">{myPosts.length}</p>
                                    </div>
                                    <FiMessageSquare className="text-4xl text-blue-500 opacity-50" />
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Member Type</p>
                                        <p className="text-lg font-bold text-purple-600">
                                            {currentUser?.membership === "member" ? "Premium" : "Free"}
                                        </p>
                                    </div>
                                    <FiAward className="text-4xl text-purple-500 opacity-50" />
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4 border border-teal-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Account Status</p>
                                        <p className="text-lg font-bold text-teal-600">Active</p>
                                    </div>
                                    <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Recent Posts Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-2xl font-bold font-montserrat text-primary mb-6 flex items-center gap-3">
                        <FiMessageSquare className="text-secondary text-2xl" /> Recent Posts
                    </h2>
                    {recentPosts.length > 0 ? (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {recentPosts.map(singleMsg => (
                                <SingleMsg key={singleMsg._id} singleMsg={singleMsg}></SingleMsg>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                            <FiMessageSquare className="text-6xl text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg mb-2">No posts yet</p>
                            <p className="text-gray-400 text-sm mb-4">Start sharing your thoughts with the community!</p>
                            <a href="/dashboard/addpost" className="btn btn-primary btn-sm">Create Your First Post</a>
                        </div>
                    )}
                </motion.div>
            </div>
        </>
    );
};

export default MyProfile;
