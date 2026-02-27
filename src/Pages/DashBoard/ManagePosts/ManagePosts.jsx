import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { HiOutlineTrash, HiOutlineEye } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useState } from "react";

const ManagePosts = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");

    const { data: postsData = { messages: [] }, refetch, isLoading } = useQuery({
        queryKey: ['admin-all-posts', searchTerm],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allMsg?limit=100&search=${searchTerm}`);
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This post will be permanently deleted!",
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
                            Swal.fire({
                                icon: "success",
                                title: "Deleted!",
                                text: "The post has been deleted.",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch();
                        }
                    });
            }
        });
    };

    return (
        <div className="p-4 md:p-8 min-h-screen bg-gray-50/50">
            <Helmet>
                <title>DialogueDock | Manage Posts</title>
            </Helmet>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold text-primary font-montserrat">Manage Posts</h1>
                    <p className="text-gray-500 mt-1">Review and manage all community discussions</p>
                </div>

                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search posts..."
                        className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all w-full md:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="absolute left-3 top-3 text-gray-400">🔍</span>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-gray-50/50 text-gray-600">
                                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider">Author</th>
                                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider">Title</th>
                                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider">Tag</th>
                                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider">Votes</th>
                                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-20">
                                        <span className="loading loading-spinner loading-lg text-secondary"></span>
                                    </td>
                                </tr>
                            ) : postsData.messages.map((post) => (
                                <tr key={post._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="w-10 h-10 rounded-full">
                                                    <img
                                                        src={post.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.name)}&background=14b8a6&color=fff&bold=true`}
                                                        alt={post.name}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-gray-800">{post.name}</p>
                                                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">{new Date(post.postTime).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 max-w-xs">
                                        <p className="text-sm font-semibold text-gray-700 line-clamp-1">{post.title}</p>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold rounded-full uppercase">
                                            {post.tag}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold text-gray-600">
                                                <span className="text-secondary">↑</span> {post.upvote || 0}
                                            </span>
                                            <span className="text-xs font-bold text-gray-600">
                                                <span className="text-red-400">↓</span> {post.downvote || 0}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-center gap-2">
                                            <Link
                                                to={`/allMsg/${post._id}`}
                                                className="p-2 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all shadow-sm active:scale-90"
                                                title="View Post"
                                            >
                                                <HiOutlineEye className="text-lg" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post._id)}
                                                className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-90"
                                                title="Delete Post"
                                            >
                                                <HiOutlineTrash className="text-lg" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {!isLoading && postsData.messages.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-400 font-medium">No posts found</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default ManagePosts;
