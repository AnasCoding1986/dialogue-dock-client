import { BiDownvote, BiUpvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { HiOutlineTrash, HiArrowLeft } from "react-icons/hi2";
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
import { motion, useScroll, useSpring } from "framer-motion";

const SingleMsgDetails = () => {
    const { user, loading } = useAuth();
    const { isAdmin } = useRole();
    const navigate = useNavigate();
    const singleMsg = useLoaderData();
    const axiosSecure = useAxiosSecure();

    const { _id, photo, name, title, text, tag, postTime } = singleMsg;

    // Reading Progress Bar
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

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
        <div className="min-h-screen bg-gray-50/50 pb-20 relative">
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary to-teal-400 transform origin-left z-50"
                style={{ scaleX }}
            />

            {/* Back Button & Top Action Bar */}
            <div className="sticky top-[72px] z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm transition-all duration-300">
                <div className="max-w-4xl mx-auto px-5 py-3 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-secondary group transition-colors"
                    >
                        <span className="p-1.5 rounded-full bg-gray-100 group-hover:bg-secondary/10 transition-colors">
                            <HiArrowLeft className="text-gray-600 group-hover:text-secondary transition-colors" />
                        </span>
                        Back to Feed
                    </button>
                    <div className="flex items-center gap-3">
                        <button onClick={handleShare} className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-secondary transition-colors" title="Share">
                            <RiShareForwardLine className="text-xl" />
                        </button>
                        {isAdmin && (
                            <button
                                onClick={handleDeletePost}
                                className="p-2 rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                                title="Delete post (Admin)"
                            >
                                <HiOutlineTrash className="text-xl" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-5 pt-10">
                {/* Main Post Content */}
                <article className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8 border border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-gray-100">
                        {/* Author Info */}
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full overflow-hidden ring-4 ring-gray-50 shadow-sm">
                                <img src={photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'U')}&background=14b8a6&color=fff&bold=true`} alt={name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 leading-tight">{name}</h3>
                                <p className="text-sm text-gray-400 font-medium">
                                    {new Date(postTime).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>

                        {/* Tag */}
                        <span className="inline-flex px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-bold capitalize">
                            #{tag}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight font-montserrat tracking-tight">
                        {title}
                    </h1>

                    <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                        {text.split('\n').map((paragraph, index) => (
                            <p key={index} className="mb-4">{paragraph}</p>
                        ))}
                    </div>

                    {/* Action Bar (Upvote / Comment) */}
                    <div className="flex flex-wrap items-center gap-4 mt-12 pt-6 border-t border-gray-100">
                        <button onClick={handleUpVote} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-50 hover:bg-secondary hover:text-white text-gray-600 font-semibold transition-all duration-300 hover:shadow-glow-teal hover:scale-105 active:scale-95">
                            <BiUpvote className="text-xl" />
                            Upvote
                        </button>
                        <button onClick={handleDownVote} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-50 hover:bg-red-500 hover:text-white text-gray-600 font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95">
                            <BiDownvote className="text-xl" />
                            Downvote
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-50 hover:bg-blue-500 hover:text-white text-gray-600 font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 ml-auto" onClick={() => modalRef.current.showModal()}>
                            <FaRegComment className="text-xl" />
                            Comment
                        </button>
                    </div>
                </article>

                {/* Comment Modal */}
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
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={closeModal}>close</button>
                    </form>
                </dialog>

                {/* Comments Section */}
                <section className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 font-montserrat">
                        Discussion <span className="text-secondary bg-secondary/10 px-3 py-1 rounded-full text-base ml-2">{comments.length}</span>
                    </h3>
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
                                            <p className="text-gray-700 mb-3">{reply.text}</p>
                                            <div className="flex items-center gap-4">
                                                {(user?.email === reply.userEmail || isAdmin) && (
                                                    <button
                                                        className="text-xs font-semibold text-red-400 hover:text-red-600 flex items-center gap-1.5 transition-colors"
                                                        onClick={() => handleDeleteComment(reply._id)}
                                                    >
                                                        <HiOutlineTrash className="text-sm" /> Delete
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </section>
            </main>

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
