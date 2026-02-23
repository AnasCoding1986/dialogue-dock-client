import { useState, forwardRef } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import SingleMsg from './SingleMsg';
import useInfiniteMsg from '../../../Hooks/useInfiniteMsg';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMagnifyingGlass, HiOutlineAdjustmentsHorizontal, HiOutlineArrowUp } from "react-icons/hi2";
import { IoChevronDown } from "react-icons/io5";
import { VirtuosoGrid } from 'react-virtuoso';

const GridList = forwardRef(({ className, style, ...props }, ref) => (
    <div
        {...props}
        ref={ref}
        style={style}
        className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className || ''}`}
    />
));
GridList.displayName = "GridList";
const AllMsg = () => {
    const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [filterOpen, setFilterOpen] = useState(false);

    const categories = [
        'coding', 'education', 'entertainment', 'environment',
        'fashion', 'food', 'health', 'politics', 'travel'
    ];

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch
    } = useInfiniteMsg(searchTerm, sortBy);

    const axiosPublic = useAxiosPublic();
    const flatMessages = data?.pages?.flatMap(page => page.messages) || [];

    // Silent polling for new posts
    const { data: latestData } = useQuery({
        queryKey: ['latestCount', searchTerm, sortBy],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allMsg?page=1&limit=1&search=${searchTerm}&sort=${sortBy}`);
            return { total: res.data.totalMessages, firstId: res.data.messages[0]?._id };
        },
        refetchInterval: 5000,
        refetchOnWindowFocus: true,
    });

    const initialTotal = data?.pages[0]?.totalMessages || 0;
    const newCount = Math.max(0, (latestData?.total || 0) - initialTotal);
    const hasNewPosts = newCount > 0 && latestData?.firstId !== flatMessages[0]?._id && sortBy === 'newest';

    const handleLoadNewPosts = () => {
        refetch();
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        setSearchTerm(selectedCategory || search);
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
    };

    const containerVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.08 }
        }
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
        <div className="w-full">
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
                        onClick={() => setSortBy(sortBy === 'newest' ? 'popular' : 'newest')}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-600 hover:border-secondary/30 hover:text-secondary transition-all duration-200 flex-shrink-0 shadow-sm"
                    >
                        <HiOutlineAdjustmentsHorizontal className="text-base" />
                        {sortBy === 'newest' ? 'Newest First' : 'Most Popular'}
                        <IoChevronDown className="text-[10px]" />
                    </button>
                </div>
            </motion.div>

            {/* Post Grid (Virtual or Empty State) */}
            <div className="relative">
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
                        {[1, 2, 3, 4].map((i) => (
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
                ) : flatMessages.length > 0 ? (
                    <VirtuosoGrid
                        useWindowScroll
                        data={flatMessages}
                        endReached={() => {
                            if (hasNextPage && !isFetchingNextPage) {
                                fetchNextPage();
                            }
                        }}
                        components={{
                            List: GridList,
                        }}
                        itemContent={(index, singleMsg) => (
                            <motion.div
                                key={singleMsg._id}
                                variants={itemVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <SingleMsg singleMsg={singleMsg} onDelete={() => refetch()} />
                            </motion.div>
                        )}
                    />
                ) : (
                    data && flatMessages.length === 0 && (
                        <motion.div
                            className="col-span-full text-center py-20 bg-white rounded-2xl border border-gray-100"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4 border border-gray-100">
                                <HiOutlineMagnifyingGlass className="text-2xl text-gray-400" />
                            </div>
                            <p className="text-gray-500 font-medium">No posts found</p>
                            <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
                        </motion.div>
                    )
                )}

                {/* Loading Indicator */}
                <div className="mt-12 text-center pb-8">
                    {isFetchingNextPage ? (
                        <div className="flex items-center justify-center gap-2">
                            <span className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    ) : hasNextPage ? (
                        <span className="text-gray-400 text-sm">Scroll for more</span>
                    ) : (
                        data?.pages[0]?.messages.length > 0 && (
                            <span className="text-gray-300 text-sm font-medium">You've reached the end ✨</span>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllMsg;
