import { BiDownvote, BiUpvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { useState, useRef, useEffect } from "react";
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon
} from "react-share";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const SingleMsgDetails = () => {
    const { user, loading } = useAuth();
    const singleMsg = useLoaderData();
    const axiosSecure = useAxiosSecure();

    const { _id, photo, name, title, text, tag, postTime } = singleMsg;

    const [commentText, setCommentText] = useState("");
    const textareaRef = useRef(null);
    const modalRef = useRef(null);
    const shareModalRef = useRef(null);

    useEffect(() => {
        if (loading) {
            return; // Loading spinner is handled separately
        }

        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };

        document.addEventListener("click", handleClickOutside, true);

        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [loading]);

    const handleComment = (e) => {
        e.preventDefault();
        const trimmedText = commentText.trim();

        if (!trimmedText) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Comment cannot be empty",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        const commentData = {
            text: trimmedText,
            userEmail: user.email,
            postTitle: title
        };

        axiosSecure.post('/comments', commentData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Comment posted",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setCommentText("");
                    textareaRef.current.style.height = "auto";
                    axiosSecure.patch(`/allMsg/commentsCount/${_id}`)
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "CommentsCount increased by one",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        });
                    closeModal();
                }
            })
            .catch(error => {
                console.error("Error posting comment:", error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Failed to post comment",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    const handleUpVote = () => {
        axiosSecure.patch(`/allMsg/upvote/${_id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "UpVote increased by one",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => {
                console.error("Error upvoting:", error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Failed to upvote",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    const handleDownVote = () => {
        axiosSecure.patch(`/allMsg/downvote/${_id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "DownVote increased by one",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => {
                console.error("Error downvoting:", error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Failed to downvote",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    const handleShare = () => {
        shareModalRef.current.showModal();
    };

    const handleTextChange = (e) => {
        setCommentText(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    };

    const handleFocus = () => {
        if (commentText === "") {
            setCommentText("Comment here");
        }
    };

    const closeModal = () => {
        modalRef.current.close();
    };

    return (
        <div className="flex items-center justify-center h-screen w-full">
            <div className="card bg-base-100 shadow-xl max-w-2xl">
                <div className="grid grid-cols-12 gap-2">
                    <div className="flex gap-2 col-span-5 p-2">
                        <div className="avatar">
                            <div className="w-10 rounded-full ring ring-[#050C9C] ring-offset-base-100 ring-offset-2">
                                <img src={photo} alt={name} />
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
                    <button className="btn bg-white" onClick={() => modalRef.current.showModal()}><FaRegComment /><span className="ml-2">Comment</span></button>
                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" ref={modalRef}>
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Comment as {user?.displayName}</h3>
                            <div className="modal-action flex justify-center">
                                <form onSubmit={handleComment} method="dialog">
                                    <textarea
                                        name="text"
                                        placeholder="Comment here"
                                        className="textarea textarea-ghost w-full"
                                        value={commentText}
                                        onChange={handleTextChange}
                                        onFocus={handleFocus}
                                        ref={textareaRef}
                                        style={{ height: "auto" }}
                                    />
                                    <input type="submit" value='Post Comment' className="mt-5 bg-[#eff7fa] p-2 rounded-2xl" />
                                </form>
                            </div>
                        </div>
                    </dialog>
                    <button onClick={handleUpVote} className="flex items-center justify-center"><BiUpvote /><span className="ml-2">UpVote</span></button>
                    <button onClick={handleDownVote} className="flex items-center justify-center"><BiDownvote /><span className="ml-2">DownVote</span></button>
                    <button onClick={handleShare} className="flex items-center justify-center"><RiShareForwardLine /><span className="ml-2">Share</span></button>
                </div>
            </div>
            <dialog ref={shareModalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Share this post</h3>
                    <div className="flex space-x-4 justify-center">
                        <FacebookShareButton url={window.location.href} quote={title}>
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <TwitterShareButton url={window.location.href} title={title}>
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        <LinkedinShareButton url={window.location.href} title={title} summary={text}>
                            <LinkedinIcon size={32} round />
                        </LinkedinShareButton>
                    </div>
                    <div className="modal-action">
                        <button className="btn" onClick={() => shareModalRef.current.close()}>Close</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default SingleMsgDetails;
