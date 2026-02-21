import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const topics = [
    { src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop', label: 'coding', emoji: '💻' },
    { src: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2574&auto=format&fit=crop', label: 'education', emoji: '📚' },
    { src: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2656&auto=format&fit=crop', label: 'entertainment', emoji: '🎬' },
    { src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb7d5763?q=80&w=2574&auto=format&fit=crop', label: 'environment', emoji: '🌿' },
    { src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop', label: 'fashion', emoji: '👗' },
    { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2670&auto=format&fit=crop', label: 'food', emoji: '🍽️' },
    { src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2670&auto=format&fit=crop', label: 'health', emoji: '💪' },
    { src: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=2533&auto=format&fit=crop', label: 'politics', emoji: '⚖️' },
    { src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop', label: 'travel', emoji: '✈️' },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
};

const Tag = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-5">
                <SectionTitle
                    heading="Explore by Topic"
                    subHeading="Browse Categories"
                />

                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    {/* First large card spans 2 cols */}
                    <motion.div variants={itemVariants} className="col-span-2 row-span-2">
                        <Link to={`/tags/${topics[0].label}`} className="group block relative h-full min-h-[280px] rounded-2xl overflow-hidden">
                            <img
                                src={topics[0].src}
                                alt={topics[0].label}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <span className="text-3xl mb-2 block">{topics[0].emoji}</span>
                                <h3 className="text-2xl font-bold text-white capitalize font-montserrat group-hover:text-secondary transition-colors">
                                    {topics[0].label}
                                </h3>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Remaining topic cards */}
                    {topics.slice(1).map((topic) => (
                        <motion.div key={topic.label} variants={itemVariants}>
                            <Link to={`/tags/${topic.label}`} className="group block relative h-[180px] sm:h-[200px] rounded-2xl overflow-hidden">
                                <img
                                    src={topic.src}
                                    alt={topic.label}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300" />
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <span className="text-xl mb-1 block">{topic.emoji}</span>
                                    <h3 className="text-sm font-bold text-white capitalize font-montserrat group-hover:text-secondary transition-colors">
                                        {topic.label}
                                    </h3>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Tag;
