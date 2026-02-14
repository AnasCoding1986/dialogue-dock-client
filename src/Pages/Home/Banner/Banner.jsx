import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoSearch } from "react-icons/io5";

const Banner = () => {
    const [selectedTag, setSelectedTag] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (selectedTag) {
            navigate(`/${selectedTag}`);
        }
    };

    const tags = [
        "coding", "education", "entertainment", "environment",
        "fashion", "food", "health", "politics", "travel"
    ];

    return (
        <div className="relative min-h-[700px] h-auto w-full overflow-hidden rounded-b-[3rem] shadow-2xl group mb-16">
            {/* Background Image with Parallax Scale on Hover */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/80 to-secondary/40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Floating Shapes for 'Super Worthy' feel */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-20 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 left-20 w-48 h-48 bg-accent/20 rounded-full blur-3xl"
            />

            {/* Content Container */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 py-20 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl tracking-tight font-montserrat">
                        Spark <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Conversations</span> <br />
                        That Matter.
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-100 mb-12 font-roboto max-w-2xl mx-auto font-light leading-relaxed">
                        Your gateway to a global community of thinkers, creators, and innovators. Join the dialogue today.
                    </p>
                </motion.div>

                {/* Search Bar Container */}
                <motion.div
                    className="w-full max-w-2xl relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-accent rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <div className="join w-full shadow-2xl rounded-full p-2 bg-white/10 backdrop-blur-md border border-white/20 relative">
                        <select
                            value={selectedTag}
                            onChange={(e) => setSelectedTag(e.target.value)}
                            className="select select-ghost join-item w-full text-lg bg-transparent text-white placeholder-white focus:bg-transparent focus:text-white border-none focus:outline-none [&>option]:text-black"
                        >
                            <option value="" disabled className="text-gray-400">Select a topic to explore...</option>
                            {tags.map(tag => (
                                <option key={tag} value={tag} className="capitalize">{tag}</option>
                            ))}
                        </select>
                        <button
                            onClick={handleSearch}
                            className="btn btn-secondary join-item rounded-full px-10 text-white font-bold border-none shadow-lg hover:shadow-secondary/50 transition-all hover:scale-105"
                        >
                            <IoSearch className="text-2xl mr-2" />
                            Search
                        </button>
                    </div>
                </motion.div>

                {/* Trending Tags */}
                <motion.div
                    className="mt-12 flex flex-wrap justify-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <span className="text-sm text-gray-300 mr-2 uppercase tracking-widest font-bold pt-2">Trending Now:</span>
                    {['coding', 'travel', 'food', 'tech', 'design'].map((tag, i) => (
                        <motion.span
                            key={tag}
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                            className="badge badge-lg badge-outline text-white border-white/40 px-4 py-4 capitalize cursor-pointer transition-colors backdrop-blur-sm"
                        >
                            #{tag}
                        </motion.span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Banner;
