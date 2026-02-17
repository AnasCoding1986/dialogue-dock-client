import { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAllMsg from '../../../Hooks/useAllMsg';
import SingleMsg from '../AllMsg/SingleMsg';

const RecentPosts = () => {
    const [allMsg] = useAllMsg();

    // Sort by postTime (latest first) and take first 5 posts
    // Ensure allMsg is an array before sorting to avoid crashes if data is initially loading/undefined
    const recentPosts = Array.isArray(allMsg)
        ? [...allMsg].sort((a, b) => new Date(b.postTime) - new Date(a.postTime)).slice(0, 5)
        : [];

    return (
        <div className='px-5 md:px-20 py-16'>
            <SectionTitle
                heading="Recent Thoughts"
                subHeading="Latest Updates"
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {recentPosts.map(msg => (
                    <SingleMsg key={msg._id} singleMsg={msg} />
                ))}
            </div>
        </div>
    );
};

export default RecentPosts;
