import { useState, useEffect } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import SingleMsg from '../AllMsg/SingleMsg';
import useInfiniteMsg from '../../../Hooks/useInfiniteMsg';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const AllMsg = () => {
    const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');

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

    // Polling is now handled in useInfiniteMsg hook with refetchInterval

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(search);
    };

    const handleSortToggle = () => {
        setSortBy(sortBy === 'newest' ? 'popular' : 'newest');
    };

    return (
        <div className="p-5 md:p-20">
            <SectionTitle
                heading="Beautiful Thoughts"
                subHeading="Join the Conversation"
            />

            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="join w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search by tag, title or content..."
                        className="input input-bordered join-item w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary join-item">Search</button>
                </form>

                <button
                    onClick={handleSortToggle}
                    className="btn bg-[#050C9C] text-white"
                >
                    Sort by {sortBy === 'newest' ? 'Popularity' : 'Newest'}
                </button>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
            >
                {data?.pages.map((page, i) => (
                    page.messages.map((singleMsg) => (
                        <motion.div
                            key={singleMsg._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <SingleMsg singleMsg={singleMsg} />
                        </motion.div>
                    ))
                ))}

                {data?.pages[0]?.messages.length === 0 && (
                    <p className="text-center col-span-full text-gray-500">
                        No thoughts found.
                    </p>
                )}
            </motion.div>

            {/* Loading Skeleton / Infinite Scroll Trigger */}
            <div ref={ref} className="mt-10 text-center">
                {isFetchingNextPage ? (
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                ) : hasNextPage ? (
                    <span className="text-gray-400">Scroll for more...</span>
                ) : (
                    data?.pages[0]?.messages.length > 0 && <span className="text-gray-400">No more messages</span>
                )}
            </div>
        </div>
    );
};

export default AllMsg;
