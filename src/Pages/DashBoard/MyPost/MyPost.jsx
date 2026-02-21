import { useState, useEffect } from 'react';
import { FaRegComment, FaCalendarAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyPost = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [allMsg, setAllMsg] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure.get('/allMsg')
            .then(res => {
                setAllMsg(res.data.messages);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [axiosSecure]);

    const handleDelete = (id, title) => {
        Swal.fire({
            title: "Delete this post?",
            html: `<p class="text-gray-600">You're about to delete:<br/><strong>"${title}"</strong></p>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/allMsg/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            const remaining = allMsg.filter(msg => msg._id !== id);
                            setAllMsg(remaining);
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your post has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        });
    };

    const myPosts = allMsg.filter(myPost => myPost.email === user.email);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>DialogueDock | My Posts</title>
            </Helmet>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold font-montserrat text-primary mb-2">
                        My Posts
                    </h1>
                    <p className="text-gray-500">
                        Manage your {myPosts.length} {myPosts.length === 1 ? 'post' : 'posts'}
                    </p>
                </motion.div>

                {myPosts.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                    >
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-gray-200">
                                        <th className="text-primary font-bold text-sm uppercase tracking-wider py-4 px-6">#</th>
                                        <th className="text-primary font-bold text-sm uppercase tracking-wider py-4 px-6">Title</th>
                                        <th className="text-primary font-bold text-sm uppercase tracking-wider py-4 px-6">Date</th>
                                        <th className="text-primary font-bold text-sm uppercase tracking-wider py-4 px-6 text-center">Votes</th>
                                        <th className="text-primary font-bold text-sm uppercase tracking-wider py-4 px-6 text-center">Comments</th>
                                        <th className="text-primary font-bold text-sm uppercase tracking-wider py-4 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myPosts.map((myPost, index) => {
                                        const voteCount = parseInt(myPost.upvote) - parseInt(myPost.downvote);
                                        return (
                                            <tr key={myPost._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <span className="text-gray-400 font-medium">{index + 1}</span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="max-w-xs">
                                                        <p className="font-semibold text-gray-800 line-clamp-1">{myPost.title}</p>
                                                        <span className="badge badge-sm badge-outline badge-secondary mt-1 capitalize">{myPost.tag}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                                                        <FaCalendarAlt className="text-xs" />
                                                        {new Date(myPost.postTime).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <div className="flex items-center justify-center gap-1">
                                                        <BiUpvote className="text-green-500" />
                                                        <span className={`font-bold ${voteCount > 0 ? 'text-green-600' : voteCount < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                                                            {voteCount}
                                                        </span>
                                                        <BiDownvote className="text-red-400" />
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <div className="flex items-center justify-center gap-1 text-primary">
                                                        <FaRegComment />
                                                        <span className="font-medium">{myPost.commentsCount || 0}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <button
                                                        onClick={() => handleDelete(myPost._id, myPost.title)}
                                                        className="btn btn-ghost btn-sm text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors rounded-lg"
                                                        title="Delete post"
                                                    >
                                                        <MdDelete className="text-xl" />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-12 text-center shadow-lg"
                    >
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No posts yet</h3>
                        <p className="text-gray-500 mb-6">Start sharing your thoughts with the community!</p>
                        <a href="/dashboard/addpost" className="btn btn-primary rounded-full px-8 shadow-lg hover:shadow-primary/30">
                            Create Your First Post
                        </a>
                    </motion.div>
                )}
            </div>
        </>
    );
};

export default MyPost;
