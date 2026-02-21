import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    HiOutlineBolt,
    HiOutlineArrowPath,
    HiOutlinePencilSquare,
    HiOutlineMagnifyingGlass,
    HiOutlineHashtag,
    HiOutlineHandThumbUp,
    HiOutlineChatBubbleLeftRight,
    HiOutlinePaintBrush,
    HiOutlineDevicePhoneMobile,
    HiOutlineShieldCheck,
    HiOutlineClock,
    HiOutlineChartBarSquare,
    HiOutlineSparkles,
    HiOutlineArrowRight,
    HiOutlineCodeBracket,
    HiOutlineServerStack,
    HiOutlineCircleStack,
    HiOutlineCpuChip,
} from 'react-icons/hi2';

/* ── animation helpers ── */
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } };

const Features = () => {
    const features = [
        { icon: HiOutlineBolt, title: 'Real-Time Updates', desc: 'See new posts, comments, and votes instantly without refreshing. Powered by smart polling.', color: 'from-amber-500 to-orange-500' },
        { icon: HiOutlineArrowPath, title: 'Infinite Scroll', desc: 'Never click "load more" again. Content loads dynamically as you explore.', color: 'from-blue-500 to-cyan-500' },
        { icon: HiOutlinePencilSquare, title: 'Rich Text Editor', desc: 'Format with bold, italics, lists, and more. Express yourself beyond plain text.', color: 'from-purple-500 to-fuchsia-500' },
        { icon: HiOutlineMagnifyingGlass, title: 'Advanced Search', desc: 'Find what you need with powerful search across titles, content, and tags.', color: 'from-secondary to-teal-400' },
        { icon: HiOutlineHashtag, title: 'Tag-Based Navigation', desc: 'Explore topics that interest you. Filter and discover effortlessly.', color: 'from-indigo-500 to-violet-500' },
        { icon: HiOutlineHandThumbUp, title: 'Voting System', desc: 'Upvote quality content and help great discussions rise to the top.', color: 'from-rose-500 to-pink-500' },
        { icon: HiOutlineChatBubbleLeftRight, title: 'Nested Comments', desc: 'Threaded discussions with unlimited depth for detailed conversations.', color: 'from-cyan-500 to-blue-500' },
        { icon: HiOutlinePaintBrush, title: 'Modern Design', desc: 'A beautiful, responsive interface with smooth animations and premium aesthetics.', color: 'from-pink-500 to-rose-500' },
        { icon: HiOutlineDevicePhoneMobile, title: 'Mobile Optimized', desc: 'Seamless experience on any device. Fully responsive and touch-friendly.', color: 'from-emerald-500 to-green-500' },
        { icon: HiOutlineShieldCheck, title: 'Secure & Private', desc: 'Data protected with JWT authentication and industry-standard security.', color: 'from-slate-500 to-gray-600' },
        { icon: HiOutlineClock, title: 'Smart Sorting', desc: 'View posts by newest, most popular, or trending to find what matters.', color: 'from-violet-500 to-purple-500' },
        { icon: HiOutlineChartBarSquare, title: 'Analytics Ready', desc: 'Track engagement with post views, votes, and comment counts.', color: 'from-amber-500 to-yellow-500' },
    ];

    const techStack = [
        { name: 'React', icon: HiOutlineCodeBracket, desc: 'UI Framework' },
        { name: 'Node.js', icon: HiOutlineServerStack, desc: 'Runtime' },
        { name: 'MongoDB', icon: HiOutlineCircleStack, desc: 'Database' },
        { name: 'Express', icon: HiOutlineCpuChip, desc: 'Backend' },
        { name: 'TailwindCSS', icon: HiOutlinePaintBrush, desc: 'Styling' },
        { name: 'JWT Auth', icon: HiOutlineShieldCheck, desc: 'Security' },
        { name: 'Framer Motion', icon: HiOutlineSparkles, desc: 'Animations' },
        { name: 'React Query', icon: HiOutlineBolt, desc: 'Data Fetching' },
    ];

    return (
        <>
            <Helmet>
                <title>Features | DialogueDock - Powerful Discussion Platform</title>
            </Helmet>

            {/* ═══════ Hero ═══════ */}
            <section className="relative min-h-[460px] bg-[#0a0f1e] flex items-center overflow-hidden">
                <div className="absolute inset-0 grid-pattern opacity-20" />
                <div className="absolute top-10 right-[20%] w-80 h-80 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-[10%] w-72 h-72 bg-purple-500/8 rounded-full blur-[100px] pointer-events-none" />

                <motion.div
                    className="relative z-10 max-w-4xl mx-auto text-center px-5 py-20"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-8 border border-secondary/20">
                        <HiOutlineBolt className="text-sm" />
                        Platform Features
                    </span>

                    <h1 className="text-4xl md:text-6xl font-bold text-white font-montserrat mb-5 leading-tight">
                        Powerful Features,
                        <br />
                        <span className="gradient-text">Seamless Experience</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Everything you need for meaningful online discussions, packed into one elegant platform.
                    </p>
                </motion.div>
            </section>

            {/* ═══════ Feature Grid ═══════ */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-5">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-primary font-montserrat mb-3">What Makes Us Special</h2>
                        <div className="flex items-center justify-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-secondary" />
                            <span className="h-px w-16 bg-gray-200" />
                            <span className="w-2 h-2 rounded-full bg-secondary" />
                        </div>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                    >
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                className="group bg-white p-7 rounded-2xl border border-gray-100 hover:border-secondary/20 hover:shadow-glass transition-all duration-300"
                            >
                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                    <f.icon className="text-xl text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-primary font-montserrat mb-2 group-hover:text-secondary transition-colors">
                                    {f.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══════ Tech Stack ═══════ */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-5">
                    <motion.div
                        className="text-center mb-14"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-primary font-montserrat mb-3">Built with Modern Tech</h2>
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <span className="w-2 h-2 rounded-full bg-secondary" />
                            <span className="h-px w-16 bg-gray-200" />
                            <span className="w-2 h-2 rounded-full bg-secondary" />
                        </div>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                            Cutting-edge technologies powering a fast, secure, and delightful experience.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {techStack.map((t, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                className="group text-center p-6 rounded-2xl bg-white border border-gray-100 hover:border-secondary/20 hover:shadow-glass transition-all duration-300"
                            >
                                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-secondary/20 transition-colors">
                                    <t.icon className="text-lg text-secondary" />
                                </div>
                                <h4 className="font-bold text-primary text-sm font-montserrat">{t.name}</h4>
                                <p className="text-gray-400 text-xs mt-0.5">{t.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══════ CTA ═══════ */}
            <section className="relative py-24 bg-[#0a0f1e] overflow-hidden">
                <div className="absolute inset-0 grid-pattern opacity-20" />
                <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <motion.div
                    className="relative z-10 max-w-3xl mx-auto text-center px-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white font-montserrat mb-5">
                        Ready to <span className="gradient-text">Experience</span> the Difference?
                    </h2>
                    <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                        Join our community and discover how DialogueDock transforms online discussions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/signup"
                            className="btn-shimmer magnetic-hover inline-flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-teal-400 text-white px-8 py-3.5 rounded-full font-bold shadow-glow-teal hover:shadow-glow-teal-lg transition-all duration-300"
                        >
                            Get Started Free
                            <HiOutlineArrowRight />
                        </Link>
                        <Link
                            to="/membership"
                            className="magnetic-hover inline-flex items-center justify-center gap-2 bg-white/5 text-white border border-white/10 px-8 py-3.5 rounded-full font-bold hover:bg-white/10 transition-all duration-300"
                        >
                            View Pricing
                        </Link>
                    </div>
                </motion.div>
            </section>
        </>
    );
};

export default Features;
