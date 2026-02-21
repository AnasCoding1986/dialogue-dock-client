import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlinePencilSquare, HiOutlinePhoto, HiOutlineLink } from "react-icons/hi2";
import useAuth from "../../../Hooks/useAuth";

const PostTeaser = () => {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <motion.div
            className="max-w-4xl mx-auto px-5 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-glass transition-shadow duration-300">
                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-secondary/20 ring-offset-2">
                        <img
                            src={user?.photoURL}
                            alt="User"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=14b8a6&color=fff&bold=true`;
                            }}
                        />
                    </div>

                    {/* Input bar */}
                    <Link
                        to="/dashboard/addpost"
                        className="flex-grow bg-gray-50 hover:bg-gray-100 text-gray-400 py-3 px-5 rounded-xl text-left transition-all duration-300 font-medium text-sm border border-gray-100 hover:border-secondary/30"
                    >
                        What's on your mind, {user?.displayName?.split(' ')[0]}?
                    </Link>
                </div>

                {/* Action bar */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-50">
                    <Link
                        to="/dashboard/addpost"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-gray-500 hover:text-secondary hover:bg-secondary/5 transition-all duration-200"
                    >
                        <HiOutlinePencilSquare className="text-base text-secondary" />
                        Write Post
                    </Link>
                    <Link
                        to="/dashboard/addpost"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200"
                    >
                        <HiOutlinePhoto className="text-base text-blue-400" />
                        Photo
                    </Link>
                    <Link
                        to="/dashboard/addpost"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-gray-500 hover:text-purple-500 hover:bg-purple-50 transition-all duration-200"
                    >
                        <HiOutlineLink className="text-base text-purple-400" />
                        Link
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default PostTeaser;
