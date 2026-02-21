import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    FaBolt, FaInfinity, FaSearch, FaThumbsUp, FaComments,
    FaPalette, FaMobile, FaShieldAlt, FaClock, FaHashtag,
    FaEdit, FaChartBar
} from 'react-icons/fa';

const Features = () => {
    const features = [
        {
            icon: FaBolt,
            title: 'Real-Time Updates',
            description: 'See new posts, comments, and votes instantly without refreshing. Powered by smart polling for seamless collaboration.',
            color: 'from-yellow-400 to-orange-500'
        },
        {
            icon: FaInfinity,
            title: 'Infinite Scroll',
            description: 'Never click "load more" again. Our infinite scroll feed loads content dynamically as you explore.',
            color: 'from-blue-400 to-cyan-500'
        },
        {
            icon: FaEdit,
            title: 'Rich Text Editor',
            description: 'Format your posts with bold, italics, lists, and more. Express yourself beyond plain text.',
            color: 'from-purple-400 to-pink-500'
        },
        {
            icon: FaSearch,
            title: 'Advanced Search',
            description: 'Find exactly what you need with powerful search across titles, content, and tags.',
            color: 'from-green-400 to-teal-500'
        },
        {
            icon: FaHashtag,
            title: 'Tag-Based Navigation',
            description: 'Explore topics that interest you with our intuitive tag system. Filter and discover effortlessly.',
            color: 'from-indigo-400 to-purple-500'
        },
        {
            icon: FaThumbsUp,
            title: 'Voting System',
            description: 'Upvote quality content and help great discussions rise to the top. Democracy in action.',
            color: 'from-red-400 to-pink-500'
        },
        {
            icon: FaComments,
            title: 'Nested Comments',
            description: 'Engage in threaded discussions with unlimited depth. Perfect for detailed conversations.',
            color: 'from-cyan-400 to-blue-500'
        },
        {
            icon: FaPalette,
            title: 'Modern Design',
            description: 'Enjoy a beautiful, responsive interface with smooth animations and premium aesthetics.',
            color: 'from-pink-400 to-rose-500'
        },
        {
            icon: FaMobile,
            title: 'Mobile Optimized',
            description: 'Seamless experience on any device. Our responsive design adapts to your screen perfectly.',
            color: 'from-emerald-400 to-green-500'
        },
        {
            icon: FaShieldAlt,
            title: 'Secure & Private',
            description: 'Your data is protected with JWT authentication and industry-standard security practices.',
            color: 'from-slate-400 to-gray-600'
        },
        {
            icon: FaClock,
            title: 'Smart Sorting',
            description: 'View posts by newest, most popular, or trending. Find the content that matters to you.',
            color: 'from-violet-400 to-purple-500'
        },
        {
            icon: FaChartBar,
            title: 'Analytics Ready',
            description: 'Track your engagement with post views, votes, and comment counts. See your impact.',
            color: 'from-amber-400 to-yellow-500'
        }
    ];

    return (
        <>
            <Helmet>
                <title>Features | DialogueDock - Powerful Discussion Platform</title>
            </Helmet>

            {/* Hero Section */}
            <div className="relative min-h-[400px] bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
                </div>

                <motion.div
                    className="relative z-10 max-w-4xl mx-auto text-center px-4 py-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Powerful Features,<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">Seamless Experience</span>
                    </h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                        Everything you need for meaningful online discussions, packed into one elegant platform.
                    </p>
                </motion.div>
            </div>

            {/* Features Grid */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">What Makes Us Special</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-secondary to-accent mx-auto"></div>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -8 }}
                            >
                                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <feature.icon className="text-3xl text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Technology Stack */}
            <div className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Built with Modern Tech</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-secondary to-accent mx-auto mb-12"></div>
                        <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
                            DialogueDock leverages cutting-edge technologies to deliver a fast, secure, and delightful user experience.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['React', 'Socket.io', 'MongoDB', 'Express', 'TailwindCSS', 'JWT Auth', 'Framer Motion', 'React Query'].map((tech, index) => (
                            <motion.div
                                key={index}
                                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-2 border-gray-200 hover:border-secondary hover:shadow-lg transition-all"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="text-lg font-bold text-primary">{tech}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 bg-gradient-to-r from-secondary to-primary text-white">
                <motion.div
                    className="max-w-4xl mx-auto text-center px-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Experience the Difference?</h2>
                    <p className="text-xl mb-8 text-gray-100">
                        Join our community and discover how DialogueDock transforms online discussions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/signup" className="btn btn-accent btn-lg text-primary font-bold hover:scale-105 transition-all shadow-xl">
                            Get Started Free
                        </Link>
                        <Link to="/pricing" className="btn btn-outline btn-lg border-white text-white hover:bg-white hover:text-primary hover:scale-105 transition-all">
                            View Pricing
                        </Link>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Features;
