import { FaCommentAlt } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { MdHowToVote } from "react-icons/md";
import useAuth from "../../../Hooks/useAuth";
import { PiTagSimpleFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const SingleMsg = ({ singleMsg }) => {
    const { user } = useAuth();
    const { _id, photo, name, email, title, text, tag, upvote, downvote, postTime, commentsCount, votesCount } = singleMsg;
    const count = parseInt(upvote) - parseInt(downvote);

    return (
        <div className="h-full">
            <Link to={`/allMsg/${_id}`}>
                <div className="card h-full bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 hover:border-secondary/30 rounded-xl overflow-hidden">
                    <div className="card-body p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="w-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                                        <img src={photo} alt={`${name || 'User'}'s avatar`} />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary text-sm">{name}</h4>
                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                        <IoTimeSharp className="text-secondary" />
                                        {new Date(postTime).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="badge badge-secondary badge-outline gap-1 capitalize">
                                <PiTagSimpleFill /> {tag}
                            </div>
                        </div>

                        <h2 className="card-title text-xl font-bold text-gray-800 mb-2 line-clamp-2 hover:text-secondary transition-colors">
                            {title}
                        </h2>

                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                            {text}
                        </p>

                        <div className="card-actions justify-between items-center mt-auto border-t border-gray-100 pt-4">
                            <div className="flex items-center gap-4 text-gray-500 text-sm">
                                <span className="flex items-center gap-1 hover:text-primary transition-colors">
                                    <MdHowToVote className="text-lg text-secondary" />
                                    {count} Votes
                                </span>
                                <span className="flex items-center gap-1 hover:text-primary transition-colors">
                                    <FaCommentAlt className="text-lg text-secondary" />
                                    {commentsCount} Comments
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default SingleMsg;
