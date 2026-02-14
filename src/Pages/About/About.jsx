import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaRocket, FaUsers, FaChartLine, FaHeart } from 'react-icons/fa';

const About = () => {
    const stats = [
        { icon: FaUsers, value: '10,000+', label: 'Active Members' },
        { icon: FaRocket, value: '50,000+', label: 'Posts Shared' },
        { icon: FaChartLine, value: '95%', label: 'Satisfaction Rate' },
        { icon: FaHeart, value: '24/7', label: 'Community Support' }
    ];

    const values = [
        {
            title: 'Open Dialogue',
            description: 'We believe in free expression and respectful conversations that bridge diverse perspectives.',
            icon: '💬'
        },
        {
            title: 'Community First',
            description: 'Our members are our priority. Every feature is designed to enhance your experience.',
            icon: '👥'
        },
        {
            title: 'Innovation',
            description: 'Real-time updates, rich content, and seamless interactions define our platform.',
            icon: '⚡'
        },
        {
            title: 'Inclusivity',
            description: 'A safe space for everyone to share ideas, regardless of background or expertise.',
            icon: '🌍'
        }
    ];

    return (
        <>
            <Helmet>
                <title>About DialogueDock | Our Mission & Story</title>
            </Helmet>

            {/* Hero Section */}
            <div className="relative min-h-[500px] bg-gradient-to-br from-primary via-primary to-secondary flex items-center justify-center text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
                </div>

                <motion.div
                    className="relative z-10 max-w-4xl mx-auto text-center px-4 py-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">Conversations</span> Come Alive
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light leading-relaxed max-w-3xl mx-auto">
                        DialogueDock is more than a discussion platform—it's a vibrant community where ideas spark, connections form, and voices are heard.
                    </p>
                    <Link to="/signup" className="btn btn-accent btn-lg text-primary font-bold shadow-xl hover:shadow-accent/50 hover:scale-105 transition-all">
                        Join Our Community
                    </Link>
                </motion.div>
            </div>

            {/* Stats Section */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="text-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full mb-4 shadow-lg">
                                    <stat.icon className="text-3xl text-white" />
                                </div>
                                <h3 className="text-4xl font-bold text-primary mb-2">{stat.value}</h3>
                                <p className="text-gray-600 font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Our Story */}
            <div className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Our Story</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-secondary to-accent mx-auto mb-8"></div>
                    </motion.div>

                    <div className="prose prose-lg max-w-none">
                        <motion.p
                            className="text-xl text-gray-700 leading-relaxed mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            DialogueDock was born from a simple belief: <strong>meaningful conversations change the world</strong>.
                            In an era of echo chambers and divisive discourse, we created a space where diverse voices can engage
                            in respectful, enriching dialogue.
                        </motion.p>

                        <motion.p
                            className="text-xl text-gray-700 leading-relaxed mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            Our platform leverages cutting-edge technology—<strong>real-time updates</strong>, <strong>rich text editing</strong>,
                            and <strong>intelligent categorization</strong>—to make your experience seamless and engaging. But technology is
                            just the vessel; our true strength lies in our community.
                        </motion.p>

                        <motion.p
                            className="text-xl text-gray-700 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            Whether you're here to share knowledge, seek advice, or simply connect with like-minded individuals,
                            DialogueDock is your harbor in the vast ocean of online discourse.
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Our Values */}
            <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Our Values</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-secondary to-accent mx-auto"></div>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                            >
                                <div className="text-5xl mb-4">{value.icon}</div>
                                <h3 className="text-2xl font-bold text-primary mb-3">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
                <motion.div
                    className="max-w-4xl mx-auto text-center px-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Dive In?</h2>
                    <p className="text-xl mb-8 text-gray-200">
                        Join thousands of members creating meaningful conversations every day.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/signup" className="btn btn-accent btn-lg text-primary font-bold hover:scale-105 transition-all">
                            Create Account
                        </Link>
                        <Link to="/features" className="btn btn-outline btn-lg border-white text-white hover:bg-white hover:text-primary hover:scale-105 transition-all">
                            Explore Features
                        </Link>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default About;
