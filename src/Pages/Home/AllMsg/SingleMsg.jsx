import { FaCommentAlt } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { MdHowToVote } from "react-icons/md";
import useAuth from "../../../Hooks/useAuth";
import { PiTagSimpleFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { HiArrowUpRight } from "react-icons/hi2";

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

const SingleMsg = ({ singleMsg }) => {
    const { user } = useAuth();
    const { _id, photo, name, email, title, text, tag, upvote, downvote, postTime, commentsCount, votesCount } = singleMsg;
    const count = parseInt(upvote) - parseInt(downvote);

    return (
        <div className="h-full group/card">
            <Link to={`/allMsg/${_id}`}>
                <div className="h-full bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-glass-lg hover:border-secondary/20 hover:-translate-y-1">
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
                        </div>

                        {/* Title */}
                        <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 leading-snug group-hover/card:text-primary transition-colors duration-200">
                            {title}
                        </h2>

                        {/* Body preview */}
                        <p className="text-gray-500 text-sm line-clamp-3 mb-5 leading-relaxed">
                            {text}
                        </p>

                        {/* Footer: Stats + Read More */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                            <div className="flex items-center gap-5 text-gray-400 text-xs font-medium">
                                <span className="flex items-center gap-1.5 hover:text-secondary transition-colors">
                                    <MdHowToVote className="text-sm" />
                                    {count}
                                </span>
                                <span className="flex items-center gap-1.5 hover:text-secondary transition-colors">
                                    <FaCommentAlt className="text-xs" />
                                    {commentsCount || 0}
                                </span>
                            </div>
                            <span className="flex items-center gap-1 text-xs font-semibold text-secondary opacity-0 group-hover/card:opacity-100 transition-all duration-300 translate-x-2 group-hover/card:translate-x-0">
                                Read more <HiArrowUpRight className="text-sm" />
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default SingleMsg;
