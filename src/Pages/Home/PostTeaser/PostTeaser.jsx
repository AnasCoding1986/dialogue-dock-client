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
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-sm border border-white/60 hover:border-secondary/20 hover:shadow-glass-lg transition-all duration-400 relative overflow-hidden group/teaser">
                {/* Decorative floating blurred blob behind input */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl pointer-events-none opacity-0 group-hover/teaser:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center gap-4 relative z-10">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-100 group-hover/teaser:ring-secondary/30 ring-offset-2 transition-all duration-300">
                        <img
                            src={user?.photoURL}
                            alt="User"
                            className="w-full h-full object-cover transform group-hover/teaser:scale-110 transition-transform duration-500"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=14b8a6&color=fff&bold=true`;
                            }}
                        />
                    </div>

                    {/* Input bar */}
                    <Link
                        to="/dashboard/addpost"
                        className="flex-grow bg-gray-50/80 hover:bg-white text-gray-500 py-3.5 px-6 rounded-full text-left transition-all duration-300 font-medium text-sm border border-gray-200 hover:border-secondary/40 hover:shadow-md group-hover/teaser:ring-4 group-hover/teaser:ring-secondary/5"
                    >
                        What's on your mind, {user?.displayName?.split(' ')[0]}?
                    </Link>
                </div>

                {/* Action bar */}
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100/50 relative z-10">
                    <Link
                        to="/dashboard/addpost"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-secondary hover:bg-secondary/10 hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                        <HiOutlinePencilSquare className="text-lg text-secondary" />
                        Write Post
                    </Link>
                    <Link
                        to="/dashboard/addpost"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-blue-500 hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                        <HiOutlinePhoto className="text-lg text-blue-400" />
                        Photo
                    </Link>
                    <Link
                        to="/dashboard/addpost"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-purple-500 hover:bg-purple-50 hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                        <HiOutlineLink className="text-lg text-purple-400" />
                        Link
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default PostTeaser;
