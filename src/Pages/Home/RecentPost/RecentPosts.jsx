import { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAllMsg from '../../../Hooks/useAllMsg';
import SingleMsg from '../AllMsg/SingleMsg';

const RecentPosts = () => {
    const [allMsg] = useAllMsg();
    const [recentPosts, setRecentPosts] = useState([]);

    useEffect(() => {
        // Sort by postTime (latest first) and take first 5 posts
        const sorted = [...allMsg].sort((a, b) => new Date(b.postTime) - new Date(a.postTime));
        setRecentPosts(sorted.slice(0, 5));
    }, [allMsg]);

    return (
        <div className='p-10'>
            <SectionTitle
                heading="Recent Thoughts"
                subHeading="See the latest shared thoughts"
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
