import { useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import SingleMsg from './SingleMsg';
import usePaginatedPosts from '../../../Hooks/usePaginatedPosts';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HiOutlineMagnifyingGlass,
    HiOutlineAdjustmentsHorizontal,
    HiOutlineArrowUp,
    HiOutlineChevronLeft,
    HiOutlineChevronRight
} from "react-icons/hi2";
import { IoChevronDown } from "react-icons/io5";

const AllMsg = () => {
    const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    const categories = [
        'coding', 'education', 'entertainment', 'environment',
        'fashion', 'food', 'health', 'politics', 'travel'
    ];

    const {
        data,
        isLoading,
        isFetching,
        refetch
    } = usePaginatedPosts(searchTerm, sortBy, currentPage, postsPerPage);

    const axiosPublic = useAxiosPublic();
    const messages = data?.messages || [];
    const totalPages = data?.totalPages || 1;

    // Silent polling for new posts (only relevant on page 1)
    const { data: latestData } = useQuery({
        queryKey: ['latestCount', searchTerm, sortBy],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allMsg?page=1&limit=1&search=${searchTerm}&sort=${sortBy}`);
            return { total: res.data.totalMessages, firstId: res.data.messages[0]?._id };
        },
        refetchInterval: 5000,
        refetchOnWindowFocus: true,
        enabled: currentPage === 1
    });

    const initialTotal = data?.totalMessages || 0;
    const newCount = Math.max(0, (latestData?.total || 0) - initialTotal);
    const hasNewPosts = newCount > 0 && latestData?.firstId !== messages[0]?._id && sortBy === 'newest' && currentPage === 1;

    const handleLoadNewPosts = () => {
        setCurrentPage(1);
        refetch();
        scrollToPosts();
    };

    const scrollToPosts = () => {
        const element = document.getElementById('posts-grid');
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        setSearchTerm(selectedCategory || search);
        setCurrentPage(1);
    };

    const handleCategoryChange = (cat) => {
        if (selectedCategory === cat) {
            setSelectedCategory('');
            setSearchTerm('');
        } else {
            setSelectedCategory(cat);
            setSearch(cat);
            setSearchTerm(cat);
        }
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        scrollToPosts();
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    return (
        <div className="w-full" id="posts-grid">
            {/* Search & Filter Bar */}
            <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex gap-2 w-full mb-6">
                    <div className="flex-1 relative">
                        <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                        <input
                            type="text"
                            placeholder="Search topics, titles, or tags..."
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-200 shadow-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn-shimmer bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors shadow-sm"
                    >
                        Search
                    </button>
                </form>

                {/* Filter Row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
                    {/* Category Pills */}
                    <div className="flex flex-wrap justify-start gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all duration-200 ${selectedCategory === cat
                                    ? "bg-secondary text-white shadow-glow-teal"
                                    : "bg-white border border-gray-200 text-gray-500 hover:bg-secondary/10 hover:text-secondary hover:border-secondary/30"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Sort Toggle */}
                    <button
                        onClick={() => {
                            setSortBy(sortBy === 'newest' ? 'popular' : 'newest');
                            setCurrentPage(1);
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-600 hover:border-secondary/30 hover:text-secondary transition-all duration-200 flex-shrink-0 shadow-sm"
                    >
                        <HiOutlineAdjustmentsHorizontal className="text-base" />
                        {sortBy === 'newest' ? 'Newest First' : 'Most Popular'}
                        <IoChevronDown className="text-[10px]" />
                    </button>
                </div>
            </motion.div>

            {/* Post Grid */}
            <div className="relative min-h-[400px]">
                {/* Floating New Posts Pill */}
                <AnimatePresence>
                    {hasNewPosts && (
                        <motion.button
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            onClick={handleLoadNewPosts}
                            className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-secondary text-white px-5 py-2 rounded-full shadow-lg hover:shadow-glow-teal transition-all duration-300 font-bold text-sm"
                        >
                            <HiOutlineArrowUp strokeWidth={3} className="text-white" />
                            {newCount} New Post{newCount !== 1 ? 's' : ''}
                        </motion.button>
                    )}
                </AnimatePresence>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white/80 rounded-[1.25rem] border border-gray-100/50 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden animate-pulse">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-200/60" />
                                    <div className="flex-1 mt-1">
                                        <div className="w-24 h-3.5 bg-gray-200/60 rounded max-w-full mb-2.5" />
                                        <div className="w-16 h-2.5 bg-gray-200/60 rounded" />
                                    </div>
                                    <div className="w-14 h-5 bg-gray-200/60 rounded-full" />
                                </div>
                                <div className="w-3/4 h-5 bg-gray-200/60 rounded mb-3" />
                                <div className="w-full h-3 bg-gray-200/60 rounded mb-2" />
                                <div className="w-full h-3 bg-gray-200/60 rounded mb-2" />
                                <div className="w-2/3 h-3 bg-gray-200/60 rounded mb-6" />
                                <div className="flex justify-between items-center pt-5 border-t border-gray-100/50">
                                    <div className="flex gap-2">
                                        <div className="w-12 h-6 bg-gray-200/60 rounded-full" />
                                        <div className="w-12 h-6 bg-gray-200/60 rounded-full" />
                                    </div>
                                    <div className="w-16 h-3 bg-gray-200/60 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : messages.length > 0 ? (
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-300 ${isFetching ? 'opacity-50' : 'opacity-100'}`}>
                        {messages.map((singleMsg) => (
                            <motion.div
                                key={singleMsg._id}
                                variants={itemVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <SingleMsg singleMsg={singleMsg} onDelete={() => refetch()} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        className="text-center py-20 bg-white rounded-2xl border border-gray-100"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4 border border-gray-100">
                            <HiOutlineMagnifyingGlass className="text-2xl text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">No posts found</p>
                        <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
                    </motion.div>
                )}

                {/* Modern Pagination UI */}
                {totalPages > 1 && (
                    <div className="mt-12 flex justify-center items-center gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200 ${currentPage === 1
                                ? "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"
                                : "bg-white border-gray-200 text-gray-600 hover:border-secondary hover:text-secondary shadow-sm"
                                }`}
                        >
                            <HiOutlineChevronLeft className="text-lg" />
                        </button>

                        <div className="flex items-center gap-2 bg-white px-2 py-1.5 rounded-2xl border border-gray-100 shadow-sm">
                            {[...Array(totalPages)].map((_, i) => {
                                const pageNum = i + 1;
                                // Show first, last, current, and pages around current
                                if (
                                    pageNum === 1 ||
                                    pageNum === totalPages ||
                                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                                ) {
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`w-9 h-9 rounded-lg text-xs font-bold transition-all duration-300 ${currentPage === pageNum
                                                ? "bg-secondary text-white shadow-glow-teal"
                                                : "text-gray-500 hover:bg-gray-50 hover:text-secondary"
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                } else if (
                                    pageNum === currentPage - 2 ||
                                    pageNum === currentPage + 2
                                ) {
                                    return <span key={pageNum} className="text-gray-300 px-1">...</span>;
                                }
                                return null;
                            })}
                        </div>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200 ${currentPage === totalPages
                                ? "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"
                                : "bg-white border-gray-200 text-gray-600 hover:border-secondary hover:text-secondary shadow-sm"
                                }`}
                        >
                            <HiOutlineChevronRight className="text-lg" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllMsg;
