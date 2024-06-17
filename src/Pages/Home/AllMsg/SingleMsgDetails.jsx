import { BiDownvote, BiUpvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";



const SingleMsgDetails = () => {

    const singleMsg = useLoaderData();
    const axiosSecure = useAxiosSecure();

    const { _id, photo, name, email, title, text, tag, upvote, downvote, postTime, commentsCount, votesCount } = singleMsg;

    const handleComment = () => {
        
    }

    const handleUpVote = () => {
        axiosSecure.patch(`/allMsg/upvote/${_id}`)
        .then(res => {
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `UpVote increase by one`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }
    const handleDownVote = () => {
        axiosSecure.patch(`/allMsg/downvote/${_id}`)
        .then(res => {
            if (res.data.modifiedCount > 0) {
                console.log('downvote clicked');
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `DownVote increase by one`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }

    const handleShare = () => {

    }

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
                    <button onClick={handleComment} className=" flex items-center justify-center"><FaRegComment /><span className="ml-2">Comment</span></button>
                    <button onClick={handleUpVote} className=" flex items-center justify-center"><BiUpvote /><span className="ml-2">UpVote</span></button>
                    <button onClick={handleDownVote} className=" flex items-center justify-center"><BiDownvote /><span className="ml-2">DownVote</span></button>
                    <button onClick={handleShare} className=" flex items-center justify-center"><RiShareForwardLine /><span className="ml-2">Share</span></button>
                </div>

            </div>

        </div>
    );
};

export default SingleMsgDetails;