import { BiDownvote, BiUpvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi2";
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
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import { useQuery } from "@tanstack/react-query";

const SingleMsgDetails = () => {
    const { user, loading } = useAuth();
    const { isAdmin } = useRole();
    const navigate = useNavigate();
    const singleMsg = useLoaderData();
    const axiosSecure = useAxiosSecure();

    const { _id, photo, name, title, text, tag, postTime } = singleMsg;

    const [commentText, setCommentText] = useState("");
    const [replyText, setReplyText] = useState("");
    const [replyingTo, setReplyingTo] = useState(null);
    const textareaRef = useRef(null);
    const modalRef = useRef(null);
    const shareModalRef = useRef(null);

    const { data: comments = [], refetch } = useQuery({
        queryKey: ['comments', _id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/comments?postId=${_id}`);
            return res.data;
        }
    });

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
            userName: user.displayName,
            userPhoto: user.photoURL,
            postTitle: title,
            postId: _id,
            parentId: null,
            time: new Date().toISOString()
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
                                // console.log("Comments count updated");
                            }
                        });
                    refetch();
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

    const handleReply = (parentId) => {
        const trimmedText = replyText.trim();

        if (!trimmedText) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Reply cannot be empty",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        const replyData = {
            text: trimmedText,
            userEmail: user.email,
            userName: user.displayName,
            userPhoto: user.photoURL,
            postTitle: title,
            postId: _id,
            parentId: parentId,
            time: new Date().toISOString()
        };

        axiosSecure.post('/comments', replyData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Reply posted",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setReplyText("");
                    setReplyingTo(null);
                    refetch();
                }
            })
            .catch(error => {
                console.error("Error posting reply:", error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Failed to post reply",
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
            setCommentText("");
        }
    };

    const closeModal = () => {
        modalRef.current.close();
    };

    /* ── Admin: delete post ── */
    const handleDeletePost = () => {
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
                        navigate('/');
                    }
                });
            }
        });
    };

    /* ── User: delete own comment ── */
    const handleDeleteComment = (commentId) => {
        Swal.fire({
            title: 'Delete this comment?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Delete',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/comments/${commentId}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire({ icon: 'success', title: 'Comment deleted', showConfirmButton: false, timer: 1200 });
                        refetch();
                    }
                });
            }
        });
    };

    const rootComments = comments.filter(comment => !comment.parentId);

    const getReplies = (commentId) => {
        return comments.filter(comment => comment.parentId === commentId);
    };

    return (
        <div className="flex flex-col items-center min-h-screen w-full pb-10">
            <div className="card bg-base-100 shadow-xl max-w-2xl w-full mt-10">
                <div className="grid grid-cols-12 gap-2">
                    <div className="flex gap-2 col-span-5 p-2">
                        <div className="avatar">
                            <div className="w-10 rounded-full ring ring-[#050C9C] ring-offset-base-100 ring-offset-2">
                                <img src={photo} alt={name} />
                            </div>
                        </div>
                        <div>
                            <p className="font-bold">{name}</p>
                            <p>{new Date(postTime).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className={`${isAdmin ? 'col-span-4' : 'col-span-5'} flex justify-center items-center text-xl font-bold`}>{title}</div>
                    <div className="col-span-2 flex justify-center items-center capitalize bg-[#e9f8f8] rounded-xl font-semibold">{tag}</div>
                    {/* Admin Delete */}
                    {isAdmin && (
                        <div className="col-span-1 flex justify-center items-center">
                            <button
                                onClick={handleDeletePost}
                                className="p-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
                                title="Delete post (Admin)"
                            >
                                <HiOutlineTrash className="text-lg" />
                            </button>
                        </div>
                    )}
                </div>
                <div className="p-2 text-lg">{text}</div>
                <div className="grid grid-cols-4 p-2 border-y-2 pb-2">
                    <button className="btn bg-white" onClick={() => modalRef.current.showModal()}><FaRegComment /><span className="ml-2">Comment</span></button>
                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" ref={modalRef}>
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Comment as {user?.displayName}</h3>
                            <div className="modal-action flex justify-center">
                                <form onSubmit={handleComment} method="dialog" className="w-full">
                                    <textarea
                                        name="text"
                                        placeholder="Comment here"
                                        className="textarea textarea-bordered w-full"
                                        value={commentText}
                                        onChange={handleTextChange}
                                        onFocus={handleFocus}
                                        ref={textareaRef}
                                        style={{ height: "auto" }}
                                    />
                                    <input type="submit" value='Post Comment' className="mt-5 btn btn-primary w-full" />
                                </form>
                            </div>
                        </div>
                    </dialog>
                    <button onClick={handleUpVote} className="flex items-center justify-center"><BiUpvote /><span className="ml-2">UpVote</span></button>
                    <button onClick={handleDownVote} className="flex items-center justify-center"><BiDownvote /><span className="ml-2">DownVote</span></button>
                    <button onClick={handleShare} className="flex items-center justify-center"><RiShareForwardLine /><span className="ml-2">Share</span></button>
                </div>
            </div>

            {/* Comments Section */}
            <div className="max-w-2xl w-full mt-5">
                <h3 className="text-xl font-bold mb-4">Comments ({comments.length})</h3>
                {rootComments.map(comment => (
                    <div key={comment._id} className="card bg-base-100 shadow-sm mb-4 p-4 border">
                        <div className="flex gap-2 items-center mb-2">
                            <div className="avatar">
                                <div className="w-8 rounded-full">
                                    <img src={comment.userPhoto || "https://i.ibb.co/tBSYrmp/profile.png"} alt={comment.userName} />
                                </div>
                            </div>
                            <div>
                                <p className="font-bold text-sm">{comment.userName}</p>
                                <p className="text-xs text-gray-500">{new Date(comment.time).toLocaleString()}</p>
                            </div>
                        </div>
                        <p className="text-gray-700 mb-2">{comment.text}</p>

                        {/* Reply & Delete Buttons */}
                        <div className="flex items-center gap-4">
                            <button
                                className="text-sm text-blue-600 hover:text-blue-800"
                                onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                            >
                                {replyingTo === comment._id ? "Cancel Reply" : "Reply"}
                            </button>
                            {(user?.email === comment.userEmail || isAdmin) && (
                                <button
                                    className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
                                    onClick={() => handleDeleteComment(comment._id)}
                                >
                                    <HiOutlineTrash className="text-xs" /> Delete
                                </button>
                            )}
                        </div>

                        {/* Reply Input */}
                        {replyingTo === comment._id && (
                            <div className="mt-2 ml-4">
                                <textarea
                                    className="textarea textarea-bordered w-full h-20"
                                    placeholder="Write a reply..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                ></textarea>
                                <button
                                    className="btn btn-sm btn-primary mt-2"
                                    onClick={() => handleReply(comment._id)}
                                >
                                    Post Reply
                                </button>
                            </div>
                        )}

                        {/* Replies */}
                        {getReplies(comment._id).length > 0 && (
                            <div className="ml-8 mt-4 border-l-2 pl-4">
                                {getReplies(comment._id).map(reply => (
                                    <div key={reply._id} className="mb-4">
                                        <div className="flex gap-2 items-center mb-1">
                                            <div className="avatar">
                                                <div className="w-6 rounded-full">
                                                    <img src={reply.userPhoto || "https://i.ibb.co/tBSYrmp/profile.png"} alt={reply.userName} />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-bold text-xs">{reply.userName}</p>
                                                <p className="text-xs text-gray-500">{new Date(reply.time).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-700">{reply.text}</p>
                                        {(user?.email === reply.userEmail || isAdmin) && (
                                            <button
                                                className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 mt-1"
                                                onClick={() => handleDeleteComment(reply._id)}
                                            >
                                                <HiOutlineTrash className="text-xs" /> Delete
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <dialog ref={shareModalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Share this post</h3>
                    <div className="flex space-x-4 justify-center mt-4">
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
