import { useState, useEffect } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import SingleMsg from './SingleMsg';
import useInfiniteMsg from '../../../Hooks/useInfiniteMsg';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { HiOutlineMagnifyingGlass, HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { IoChevronDown } from "react-icons/io5";

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
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch
    } = useInfiniteMsg(searchTerm, sortBy);

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

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
        <div className="max-w-7xl mx-auto px-5 py-8">
            <SectionTitle
                heading="Explore & Discuss"
                subHeading="Community Feed"
            />

            {/* Search & Filter Bar */}
            <motion.div
                className="mb-10"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto mb-6">
                    <div className="flex-1 relative">
                        <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                        <input
                            type="text"
                            placeholder="Search topics, titles, or tags..."
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-200"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn-shimmer bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors"
                    >
                        Search
                    </button>
                </form>

                {/* Filter Row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
                    {/* Category Pills */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all duration-200 ${selectedCategory === cat
                                        ? "bg-secondary text-white shadow-glow-teal"
                                        : "bg-gray-100 text-gray-500 hover:bg-secondary/10 hover:text-secondary"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Sort Toggle */}
                    <button
                        onClick={() => setSortBy(sortBy === 'newest' ? 'popular' : 'newest')}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-600 hover:border-secondary/30 hover:text-secondary transition-all duration-200 flex-shrink-0"
                    >
                        <HiOutlineAdjustmentsHorizontal className="text-base" />
                        {sortBy === 'newest' ? 'Newest First' : 'Most Popular'}
                        <IoChevronDown className="text-[10px]" />
                    </button>
                </div>
            </motion.div>

            {/* Post Grid */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {data?.pages.map((page) => (
                    page.messages.map((singleMsg) => (
                        <motion.div
                            key={singleMsg._id}
                            variants={itemVariants}
                        >
                            <SingleMsg singleMsg={singleMsg} />
                        </motion.div>
                    ))
                ))}

                {data?.pages[0]?.messages.length === 0 && (
                    <motion.div
                        className="col-span-full text-center py-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                            <HiOutlineMagnifyingGlass className="text-2xl text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">No posts found</p>
                        <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
                    </motion.div>
                )}
            </motion.div>

            {/* Loading / Infinite Scroll Trigger */}
            <div ref={ref} className="mt-12 text-center">
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
    );
};

export default AllMsg;
