import { FaCommentAlt } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { MdHowToVote } from "react-icons/md";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { PiTagSimpleFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { HiArrowUpRight, HiOutlineTrash, HiChevronDown, HiChevronUp } from "react-icons/hi2";
import Swal from "sweetalert2";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Simple time-ago formatter
const timeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);
    const diffWeek = Math.floor(diffDay / 7);
    const diffMonth = Math.floor(diffDay / 30);

    if (diffSec < 60) return 'just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHr < 24) return `${diffHr}h ago`;
    if (diffDay < 7) return `${diffDay}d ago`;
    if (diffWeek < 5) return `${diffWeek}w ago`;
    if (diffMonth < 12) return `${diffMonth}mo ago`;
    return past.toLocaleDateString();
};

const SingleMsg = ({ singleMsg, onDelete }) => {
    const { user } = useAuth();
    const { isAdmin } = useRole();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { _id, photo, name, email, title, text, tag, upvote, downvote, postTime, commentsCount, votesCount } = singleMsg;

    // UI states
    const [isExpanded, setIsExpanded] = useState(false);
    const [localVoteCount, setLocalVoteCount] = useState(parseInt(upvote || 0) - parseInt(downvote || 0));
    const [isUpvoted, setIsUpvoted] = useState(false);

    const handleVote = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Optimistic UI update
        if (!isUpvoted) {
            setLocalVoteCount(prev => prev + 1);
            setIsUpvoted(true);

            axiosSecure.patch(`/allMsg/upvote/${_id}`).catch(() => {
                // Revert if failed
                setLocalVoteCount(prev => prev - 1);
                setIsUpvoted(false);
            });
        }
    };

    const handleAdminDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        Swal.fire({
            title: 'Delete this post?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Yes, delete it',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/allMsg/${_id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire({ icon: 'success', title: 'Post deleted', showConfirmButton: false, timer: 1500 });
                        if (onDelete) onDelete(_id);
                    }
                });
            }
        });
    };

    return (
        <div className="h-full group/card perspective-1000">
            {/* The entire card is clickable to go to details, unless a button is clicked */}
            <div
                onClick={() => navigate(`/allMsg/${_id}`)}
                className="cursor-pointer h-full bg-white/90 backdrop-blur-md rounded-[1.25rem] border border-gray-100/50 overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-secondary/30 hover:-translate-y-1.5 transform-gpu flex flex-col"
            >
                {/* Accent top bar */}
                <div className="h-1 w-full bg-gradient-to-r from-secondary/0 via-secondary/60 to-secondary/0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

                <div className="p-6">
                    {/* Header: Author + Tag */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-100 group-hover/card:ring-secondary/30 transition-all duration-300 flex-shrink-0">
                                {photo ? (
                                    <img
                                        src={photo}
                                        alt={`${name || 'User'}'s avatar`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'U')}&background=14b8a6&color=fff&bold=true&size=40`;
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white font-bold text-sm">
                                        {name?.charAt(0)?.toUpperCase() || 'U'}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4 className="font-semibold text-primary text-sm leading-tight">{name}</h4>
                                <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                    <IoTimeSharp className="text-secondary/70" />
                                    {timeAgo(postTime)}
                                </p>
                            </div>
                        </div>
                        <Link
                            to={`/tags/${tag}`}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 bg-secondary/8 text-secondary text-xs font-semibold px-3 py-1 rounded-full capitalize hover:bg-secondary hover:text-white transition-all duration-200"
                        >
                            <PiTagSimpleFill className="text-[10px]" /> {tag}
                        </Link>
                        {isAdmin && (
                            <button
                                onClick={handleAdminDelete}
                                className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors opacity-0 group-hover/card:opacity-100"
                                title="Delete post (Admin)"
                            >
                                <HiOutlineTrash className="text-sm" />
                            </button>
                        )}
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 leading-snug group-hover/card:text-primary transition-colors duration-200">
                        {title}
                    </h2>

                    {/* Body preview / Expanded text */}
                    <AnimatePresence initial={false}>
                        <motion.p
                            layout
                            className={`text-gray-500 text-sm mb-5 leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}
                        >
                            {text}
                        </motion.p>
                    </AnimatePresence>

                    {/* Footer: Stats + Read More */}
                    <div className="flex justify-between items-center pt-5 mt-auto border-t border-gray-100/50 relative z-10">
                        <div className="flex items-center gap-2">
                            <motion.button
                                onClick={handleVote}
                                whileTap={{ scale: 0.85 }}
                                animate={isUpvoted ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] } : {}}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${isUpvoted ? 'bg-secondary text-white shadow-glow-teal' : 'bg-gray-50 hover:bg-secondary/10 hover:text-secondary text-gray-500'}`}
                            >
                                <MdHowToVote className="text-sm" />
                                {localVoteCount}
                            </motion.button>
                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 hover:bg-blue-50 hover:text-blue-500 text-gray-500 text-xs font-semibold transition-all duration-300 group/comment">
                                <FaCommentAlt className="text-xs group-hover/comment:scale-110 transition-transform" />
                                {commentsCount || 0}
                            </span>
                        </div>

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsExpanded(!isExpanded);
                            }}
                            className="flex items-center gap-1 text-xs font-bold text-secondary bg-secondary/10 hover:bg-secondary/20 px-3 py-1.5 rounded-full transition-colors active:scale-95"
                        >
                            {isExpanded ? 'Show less' : 'Read more'} <HiArrowUpRight className="text-sm" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleMsg;
