import { BiDownvote, BiUpvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { useLoaderData } from "react-router-dom";



const SingleMsgDetails = () => {

    const singleMsg = useLoaderData();

    const { photo, name, email, title, text, tag, upvote, downvote, postTime, commentsCount, votesCount } = singleMsg;

    return (
        <div className="flex items-center justify-center h-screen w-full">


            <div className="card bg-base-100 shadow-xl">
                <div className="grid grid-cols-12 gap-2">

                    <div className="flex gap-2 col-span-5 p-2">
                        <div className="avatar">
                            <div className="w-10 rounded-full ring ring-[#050C9C] ring-offset-base-100 ring-offset-2">
                                <img src={photo} />
                            </div>
                        </div>
                        <div>
                            <p className="font-bold">{name}</p>
                            <p>{postTime}</p>
                        </div>
                    </div>

                    <div className="col-span-5 flex justify-center items-center text-xl font-bold">{title}</div>
                    <div className="col-span-2 flex justify-center items-center capitalize bg-[#e9f8f8] rounded-xl font-semibold">{tag}</div>
                </div>
                <div className="p-2 text-lg">{text}</div>
                <div className="grid grid-cols-4 p-2 border-y-2 pb-2">
                    <div className=" flex items-center justify-center"><FaRegComment /><span className="ml-2">Comment</span></div>
                    <div className=" flex items-center justify-center"><BiUpvote /><span className="ml-2">UpVote</span></div>
                    <div className=" flex items-center justify-center"><BiDownvote /><span className="ml-2">DownVote</span></div>
                    <div className=" flex items-center justify-center"><RiShareForwardLine /><span className="ml-2">Share</span></div>
                </div>

            </div>

        </div>
    );
};

export default SingleMsgDetails;