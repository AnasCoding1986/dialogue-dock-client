import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    HiOutlineUserGroup,
    HiOutlineRocketLaunch,
    HiOutlineChartBar,
    HiOutlineHeart,
    HiOutlineChatBubbleLeftRight,
    HiOutlineLightBulb,
    HiOutlineGlobeAlt,
    HiOutlineBolt,
    HiOutlineArrowRight,
    HiOutlineSparkles,
} from 'react-icons/hi2';

/* ───── animation helpers ───── */
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const About = () => {
    /* ── data ── */
    const stats = [
        { icon: HiOutlineUserGroup, value: '10,000+', label: 'Active Members' },
        { icon: HiOutlineRocketLaunch, value: '50,000+', label: 'Posts Shared' },
        { icon: HiOutlineChartBar, value: '95%', label: 'Satisfaction' },
        { icon: HiOutlineHeart, value: '24/7', label: 'Support' },
    ];

    const values = [
        {
            title: 'Open Dialogue',
            desc: 'Free expression and respectful conversations that bridge diverse perspectives.',
            icon: HiOutlineChatBubbleLeftRight,
            color: 'from-secondary to-teal-400',
        },
        {
            title: 'Community First',
            desc: 'Every feature is designed with our members at the center of the experience.',
            icon: HiOutlineUserGroup,
            color: 'from-blue-500 to-indigo-500',
        },
        {
            title: 'Innovation',
            desc: 'Real-time updates, rich content, and seamless interactions define our platform.',
            icon: HiOutlineLightBulb,
            color: 'from-amber-500 to-orange-500',
        },
        {
            title: 'Inclusivity',
            desc: 'A safe space for everyone to share ideas, regardless of background or expertise.',
            icon: HiOutlineGlobeAlt,
            color: 'from-purple-500 to-fuchsia-500',
        },
    ];

    const timeline = [
        { year: '2023', title: 'The Idea', desc: 'DialogueDock was conceived as a platform for meaningful online discourse.' },
        { year: '2024', title: 'Launch', desc: 'We launched with real-time discussions, rich editing, and a passionate early community.' },
        { year: '2025', title: 'Growth', desc: 'Scaled to 10,000+ members with categories, membership tiers, and smart features.' },
        { year: 'Next', title: 'The Future', desc: 'AI-powered insights, mobile apps, and deeper community tools on the horizon.' },
    ];

    return (
        <>
            <Helmet>
                <title>About DialogueDock | Our Mission & Story</title>
            </Helmet>

            {/* ═══════ Hero ═══════ */}
            <section className="relative min-h-[520px] bg-[#0a0f1e] flex items-center overflow-hidden">
                {/* Background layers */}
                <div className="absolute inset-0 grid-pattern opacity-20" />
                <div className="absolute top-10 left-[10%] w-80 h-80 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-[15%] w-96 h-96 bg-purple-500/8 rounded-full blur-[100px] pointer-events-none" />

                <motion.div
                    className="relative z-10 max-w-4xl mx-auto text-center px-5 py-24"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-8 border border-secondary/20">
                        <HiOutlineSparkles className="text-sm" />
                        About Us
                    </span>

                    <h1 className="text-4xl md:text-6xl font-bold text-white font-montserrat mb-6 leading-tight">
                        Where{' '}
                        <span className="gradient-text">Conversations</span>
                        <br className="hidden sm:block" />
                        Come Alive
                    </h1>

                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                        DialogueDock is more than a discussion platform—it's a vibrant
                        community where ideas spark, connections form, and voices are heard.
                    </p>

                    <Link
                        to="/signup"
                        className="btn-shimmer magnetic-hover inline-flex items-center gap-2 bg-gradient-to-r from-secondary to-teal-400 text-white px-8 py-3.5 rounded-full font-bold shadow-glow-teal hover:shadow-glow-teal-lg transition-all duration-300"
                    >
                        Join Our Community
                        <HiOutlineArrowRight />
                    </Link>
                </motion.div>
            </section>

            {/* ═══════ Stats ═══════ */}
            <section className="relative bg-white py-0">
                <motion.div
                    className="max-w-5xl mx-auto px-5 -mt-14 relative z-20"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((s, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                className="bg-white rounded-2xl border border-gray-100 shadow-glass-lg p-6 text-center hover:shadow-xl transition-shadow"
                            >
                                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-3">
                                    <s.icon className="text-2xl text-secondary" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-primary font-montserrat">{s.value}</h3>
                                <p className="text-gray-400 text-xs mt-1 font-medium">{s.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ═══════ Our Story ═══════ */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-5">
                    <motion.div
                        className="text-center mb-14"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-primary font-montserrat mb-3">Our Story</h2>
                        <div className="flex items-center justify-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-secondary" />
                            <span className="h-px w-16 bg-gray-200" />
                            <span className="w-2 h-2 rounded-full bg-secondary" />
                        </div>
                    </motion.div>

                    <div className="space-y-6">
                        {[
                            <>DialogueDock was born from a simple belief: <strong className="text-primary">meaningful conversations change the world</strong>. In an era of echo chambers and divisive discourse, we created a space where diverse voices engage in respectful, enriching dialogue.</>,
                            <>Our platform leverages cutting-edge technology—<strong className="text-primary">real-time updates</strong>, <strong className="text-primary">rich text editing</strong>, and <strong className="text-primary">intelligent categorization</strong>—to make your experience seamless and engaging. But technology is just the vessel; our true strength lies in our community.</>,
                            <>Whether you're here to share knowledge, seek advice, or simply connect with like-minded individuals, DialogueDock is your harbor in the vast ocean of online discourse.</>,
                        ].map((text, i) => (
                            <motion.p
                                key={i}
                                className="text-gray-600 text-lg leading-relaxed"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                {text}
                            </motion.p>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ Timeline ═══════ */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-4xl mx-auto px-5">
                    <motion.div
                        className="text-center mb-14"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-primary font-montserrat mb-3">Our Journey</h2>
                        <div className="flex items-center justify-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-secondary" />
                            <span className="h-px w-16 bg-gray-200" />
                            <span className="w-2 h-2 rounded-full bg-secondary" />
                        </div>
                    </motion.div>

                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="space-y-10"
                        >
                            {timeline.map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeUp}
                                    className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    {/* Dot */}
                                    <div className="absolute left-5 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-secondary to-teal-400 border-4 border-white shadow-md -translate-x-1/2 z-10" />

                                    {/* Content */}
                                    <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8 md:ml-auto'}`}>
                                        <span className="inline-block text-xs font-bold text-secondary uppercase tracking-widest mb-1">{item.year}</span>
                                        <h4 className="text-lg font-bold text-primary font-montserrat mb-1">{item.title}</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════ Values ═══════ */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-5">
                    <motion.div
                        className="text-center mb-14"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-primary font-montserrat mb-3">Our Values</h2>
                        <div className="flex items-center justify-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-secondary" />
                            <span className="h-px w-16 bg-gray-200" />
                            <span className="w-2 h-2 rounded-full bg-secondary" />
                        </div>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-2 gap-5"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {values.map((v, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                className="group flex gap-5 p-6 rounded-2xl bg-white border border-gray-100 hover:border-secondary/20 hover:shadow-glass transition-all duration-300"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.color} bg-opacity-10 flex items-center justify-center flex-shrink-0 shadow-sm`}>
                                    <v.icon className="text-2xl text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-primary font-montserrat mb-1">{v.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                                </div>
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
                        Ready to <span className="gradient-text">Dive In</span>?
                    </h2>
                    <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                        Join thousands of members creating meaningful conversations every day.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/signup"
                            className="btn-shimmer magnetic-hover inline-flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-teal-400 text-white px-8 py-3.5 rounded-full font-bold shadow-glow-teal hover:shadow-glow-teal-lg transition-all duration-300"
                        >
                            Create Account
                            <HiOutlineArrowRight />
                        </Link>
                        <Link
                            to="/features"
                            className="magnetic-hover inline-flex items-center justify-center gap-2 bg-white/5 text-white border border-white/10 px-8 py-3.5 rounded-full font-bold hover:bg-white/10 transition-all duration-300"
                        >
                            Explore Features
                        </Link>
                    </div>
                </motion.div>
            </section>
        </>
    );
};

export default About;
