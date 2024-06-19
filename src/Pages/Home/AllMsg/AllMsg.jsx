import React, { useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAllMsg from '../../../Hooks/useAllMsg';
import SingleMsg from '../AllMsg/SingleMsg';

const AllMsg = () => {
    const [allMsg, refetch] = useAllMsg();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(allMsg.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const currentItems = allMsg.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <div className='p-20'>
            <SectionTitle
                heading="Beautiful Thoughts"
                subHeading="Explore beautiful thoughts"
            ></SectionTitle>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {currentItems.map(singleMsg => (
                    <SingleMsg key={singleMsg._id} singleMsg={singleMsg}></SingleMsg>
                ))}
            </div>
            <div className='flex justify-center mt-5 space-x-2'>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index)}
                        className={`btn ${index === currentPage ? 'btn-primary' : 'btn-outline'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllMsg;
