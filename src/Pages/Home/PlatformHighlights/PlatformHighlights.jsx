import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineBolt, HiOutlineUserGroup, HiOutlineChatBubbleLeftRight, HiOutlineHashtag } from 'react-icons/hi2';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const PlatformHighlights = () => {
    const highlights = [
        {
            icon: HiOutlineBolt,
            title: 'Real-Time Engagement',
            description: 'See conversations unfold instantly with live polling for real-time updates.',
            color: 'text-amber-500',
            bg: 'bg-amber-50',
            borderHover: 'hover:border-amber-200',
        },
        {
            icon: HiOutlineUserGroup,
            title: 'Thriving Community',
            description: 'Join thousands of active members sharing knowledge daily.',
            color: 'text-blue-500',
            bg: 'bg-blue-50',
            borderHover: 'hover:border-blue-200',
        },
        {
            icon: HiOutlineChatBubbleLeftRight,
            title: 'Meaningful Discussions',
            description: 'Engage in rich, threaded conversations that matter.',
            color: 'text-purple-500',
            bg: 'bg-purple-50',
            borderHover: 'hover:border-purple-200',
        },
        {
            icon: HiOutlineHashtag,
            title: 'Smart Organization',
            description: 'Find exactly what you need with intuitive tag-based navigation.',
            color: 'text-teal-500',
            bg: 'bg-teal-50',
            borderHover: 'hover:border-teal-200',
        }
    ];

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-5">
                <SectionTitle
                    heading="Why Choose DialogueDock?"
                    subHeading="Platform Features"
                />

                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    {highlights.map((h, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className={`group relative bg-white rounded-2xl p-7 border border-gray-100 ${h.borderHover} transition-all duration-300 hover:shadow-glass-lg hover:-translate-y-1`}
                        >
                            {/* Icon */}
                            <div className={`w-14 h-14 rounded-xl ${h.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                <h.icon className={`text-2xl ${h.color}`} />
                            </div>

                            <h3 className="text-lg font-bold text-primary mb-2 font-montserrat">
                                {h.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {h.description}
                            </p>

                            {/* Subtle corner accent on hover */}
                            <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-3xl ${h.bg} opacity-0 group-hover:opacity-40 transition-opacity duration-300`} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <Link
                        to="/features"
                        className="btn-shimmer inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        Explore All Features
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default PlatformHighlights;
