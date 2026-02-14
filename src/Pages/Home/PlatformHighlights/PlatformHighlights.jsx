import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBolt, FaUsers, FaComments, FaHashtag } from 'react-icons/fa';

const PlatformHighlights = () => {
    const highlights = [
        {
            icon: FaBolt,
            title: 'Real-Time Engagement',
            description: 'See conversations unfold instantly with Socket.io powered live updates',
            gradient: 'from-yellow-400 to-orange-500'
        },
        {
            icon: FaUsers,
            title: 'Thriving Community',
            description: 'Join thousands of active members sharing knowledge daily',
            gradient: 'from-blue-400 to-cyan-500'
        },
        {
            icon: FaComments,
            title: 'Meaningful Discussions',
            description: 'Engage in rich, threaded conversations that matter',
            gradient: 'from-purple-400 to-pink-500'
        },
        {
            icon: FaHashtag,
            title: 'Smart Organization',
            description: 'Find exactly what you need with intuitive tag-based navigation',
            gradient: 'from-green-400 to-teal-500'
        }
    ];

    return (
        <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-montserrat">
                        Why Choose DialogueDock?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Built for modern communities who value quality, speed, and meaningful connections
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-secondary to-accent mx-auto mt-4"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {highlights.map((highlight, index) => (
                        <motion.div
                            key={index}
                            className="text-center group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${highlight.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                <highlight.icon className="text-4xl text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3 font-montserrat">
                                {highlight.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {highlight.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <Link
                        to="/features"
                        className="btn btn-primary btn-lg text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                    >
                        Explore All Features
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default PlatformHighlights;
