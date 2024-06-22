import { useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAllMsg from '../../../Hooks/useAllMsg';
import SingleMsg from '../AllMsg/SingleMsg';

const AllMsg = () => {
    const [allMsg, refetch] = useAllMsg();
    const [currentPage, setCurrentPage] = useState(0);
    const [sortBy, setSortBy] = useState('date'); // State to manage sorting criteria
    const itemsPerPage = 5;

    const totalPages = Math.ceil(allMsg.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Sorting messages based on selected criteria
    const sortedMessages = [...allMsg].sort((a, b) => {
        if (sortBy === 'popularity') {
            const aCount = a.upvote - a.downvote;
            const bCount = b.upvote - b.downvote;
            return bCount - aCount;
        } else {
            return new Date(b.postTime) - new Date(a.postTime);
        }
    });

    const currentItems = sortedMessages.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const renderPagination = () => {
        const visiblePages = [];
        let startPage = Math.max(0, currentPage - 2);
        let endPage = Math.min(totalPages - 1, currentPage + 2);

        if (startPage > 0) {
            visiblePages.push(0, '...');
        }

        for (let i = startPage; i <= endPage; i++) {
            visiblePages.push(i);
        }

        if (endPage < totalPages - 1) {
            visiblePages.push('...', totalPages - 1);
        }

        return visiblePages.map((page, index) => (
            typeof page === 'string' ? (
                <span key={index} className='btn btn-disabled'>{page}</span>
            ) : (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`btn ${page === currentPage ? 'btn-primary' : 'btn-outline'}`}
                >
                    {page + 1}
                </button>
            )
        ));
    };

    return (
        <div className='p-20'>
            <SectionTitle
                heading="Beautiful Thoughts"
                subHeading="Explore beautiful thoughts"
            ></SectionTitle>
            <div className='flex justify-end mb-5'>
                <button
                    onClick={() => setSortBy(sortBy === 'date' ? 'popularity' : 'date')}
                    className='btn bg-[#050C9C] text-white'
                >
                    Sort by {sortBy === 'date' ? 'Popularity' : 'Date'}
                </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {currentItems.map(singleMsg => (
                    <SingleMsg key={singleMsg._id} singleMsg={singleMsg}></SingleMsg>
                ))}
            </div>
            <div className='flex justify-center mt-5 space-x-2'>
                <button
                    onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
                    className='btn btn-outline'
                    disabled={currentPage === 0}
                >
                    &lt;
                </button>
                {renderPagination()}
                <button
                    onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
                    className='btn btn-outline'
                    disabled={currentPage === totalPages - 1}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default AllMsg;
