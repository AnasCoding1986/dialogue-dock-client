import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaArrowLeft } from 'react-icons/fa';
import useAllMsg from '../../../Hooks/useAllMsg';
import SingleMsg from '../AllMsg/SingleMsg';

const TagPage = () => {
    const { tagName } = useParams();
    const [allMsg] = useAllMsg();

    const filteredPosts = allMsg.filter(
        post => post.tag?.toLowerCase() === tagName?.toLowerCase()
    );

    return (
        <>
            <Helmet>
                <title>DialogueDock | {tagName?.charAt(0).toUpperCase() + tagName?.slice(1)} Posts</title>
            </Helmet>

            {/* Hero */}
            <div className="relative min-h-[280px] bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
                </div>
                <motion.div
                    className="relative z-10 text-center px-4 py-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-sm uppercase tracking-widest text-gray-200 mb-3">Browsing by topic</p>
                    <h1 className="text-5xl md:text-6xl font-bold capitalize font-montserrat">
                        #{tagName}
                    </h1>
                    <p className="text-gray-200 mt-4 text-lg">
                        {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
                    </p>
                </motion.div>
            </div>

            {/* Posts Grid */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-8 font-semibold">
                    <FaArrowLeft /> Back to Home
                </Link>

                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map(singleMsg => (
                            <motion.div
                                key={singleMsg._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <SingleMsg singleMsg={singleMsg} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No posts found</h3>
                        <p className="text-gray-500 mb-6">There are no posts tagged with &quot;{tagName}&quot; yet.</p>
                        <Link to="/" className="btn btn-primary text-white">
                            Browse All Posts
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default TagPage;
