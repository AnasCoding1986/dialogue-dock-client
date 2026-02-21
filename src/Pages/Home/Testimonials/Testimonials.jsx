import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { HiOutlineChatBubbleOvalLeftEllipsis } from 'react-icons/hi2';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Sarah Chen',
            role: 'Software Engineer',
            initials: 'SC',
            gradient: 'from-violet-500 to-purple-600',
            text: 'DialogueDock has become my go-to platform for tech discussions. The real-time updates and rich text editor make collaboration seamless!',
            rating: 5
        },
        {
            name: 'Marcus Johnson',
            role: 'Community Manager',
            initials: 'MJ',
            gradient: 'from-blue-500 to-cyan-500',
            text: 'I love how easy it is to organize conversations by tags. Finding relevant discussions has never been simpler.',
            rating: 5
        },
        {
            name: 'Priya Sharma',
            role: 'Content Creator',
            initials: 'PS',
            gradient: 'from-teal-500 to-emerald-500',
            text: 'The voting system helps quality content rise to the top. It\'s refreshing to see a platform that values substance over noise.',
            rating: 5
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
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-5 relative z-10">
                <SectionTitle
                    heading="What Our Community Says"
                    subHeading="Testimonials"
                />

                <motion.div
                    className="grid md:grid-cols-3 gap-7"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="group relative bg-white rounded-2xl p-7 border border-gray-100 hover:border-secondary/20 transition-all duration-300 hover:shadow-glass-lg hover:-translate-y-1"
                        >
                            {/* Quote icon */}
                            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mb-5">
                                <HiOutlineChatBubbleOvalLeftEllipsis className="text-xl text-secondary" />
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(t.rating)].map((_, j) => (
                                    <FaStar key={j} className="text-amber-400 text-xs" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-gray-600 text-sm leading-relaxed mb-6 min-h-[80px]">
                                "{t.text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-5 border-t border-gray-50">
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
                                    {t.initials}
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary text-sm">{t.name}</h4>
                                    <p className="text-gray-400 text-xs">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
