import { FaCommentAlt } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { MdHowToVote } from "react-icons/md";
import useAuth from "../../../Hooks/useAuth";
import { PiTagSimpleFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const SingleMsg = ({ singleMsg }) => {
    const { user } = useAuth();

    // Destructure the singleMsg object safely
    if (!singleMsg || singleMsg.length === 0) return null;

    const { _id,photo, name, email, title, text, tag, upvote, downvote, postTime, commentsCount, votesCount } = singleMsg[0];

    return (
        <div>
            <Link to={`/${_id}`}>
                <div className="p-5 shadow-2xl border-dotted rounded-3xl bg-[#f9fcfc]">
                    <div className="grid grid-cols-4 p-5">
                        <div className="col-span-2">
                            <div className="avatar">
                                <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={photo} alt={`${name || 'User'}'s avatar`} />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <h3 className="flex items-center gap-2 capitalize">
                                <span className="font-bold text-[#3572EF]">
                                    <PiTagSimpleFill />
                                </span>
                                {tag}
                            </h3>
                        </div>
                    </div>
                    <div className="border-y-[1px] border-[#3572EF] border-dotted p-10 flex justify-center items-center text-2xl font-bold">
                        <h2>{title}</h2>
                    </div>
                    <div className="grid grid-cols-3 p-5 gap-2">
                        <div className="col-span-1 flex items-center justify-center">
                            <span className="font-bold text-[#3572EF]">
                                <IoTimeSharp />
                            </span>
                            : <span className="font-light ml-2 text-sm">{postTime}</span>
                        </div>
                        <div className="col-span-1 flex items-center justify-center">
                            <span className="font-bold text-[#3572EF]">
                                <FaCommentAlt />
                            </span>
                            : <span className="font-light ml-2 text-sm">{commentsCount}</span>
                        </div>
                        <div className="col-span-1 flex items-center justify-center">
                            <span className="font-bold text-[#3572EF]">
                                <MdHowToVote />
                            </span>
                            : <span className="font-light ml-2 text-sm">{votesCount}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default SingleMsg;
