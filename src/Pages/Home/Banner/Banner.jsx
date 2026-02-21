import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { IoArrowDown } from "react-icons/io5";
import { HiOutlineUsers, HiOutlineChatBubbleLeftRight, HiOutlineSparkles } from "react-icons/hi2";

const Banner = () => {
    const navigate = useNavigate();
    const bannerRef = useRef(null);
    const statsRef = useRef(null);
    const isStatsInView = useInView(statsRef, { once: true });

    // Scroll-driven parallax
    const { scrollY } = useScroll();
    const bgY = useTransform(scrollY, [0, 700], [0, 250]);
    const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const contentY = useTransform(scrollY, [0, 400], [0, -80]);

    // Animated counter
    const AnimatedCounter = ({ end, suffix = "", duration = 2000 }) => {
        const [count, setCount] = useState(0);
        const counterRef = useRef(null);
        const isInView = useInView(counterRef, { once: true });

        useEffect(() => {
            if (!isInView) return;
            let start = 0;
            const increment = end / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }, [isInView, end, duration]);

        return <span ref={counterRef}>{count.toLocaleString()}{suffix}</span>;
    };

    const tags = ['coding', 'travel', 'food', 'health', 'education'];

    // Word stagger animation
    const headlineWords = ["Spark", "Conversations", "That", "Matter."];
    const wordVariants = {
        hidden: { opacity: 0, y: 30, rotateX: -20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                delay: i * 0.15,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        }),
    };

    const stats = [
        { icon: HiOutlineUsers, value: 10, suffix: "K+", label: "Active Members" },
        { icon: HiOutlineChatBubbleLeftRight, value: 50, suffix: "K+", label: "Posts Shared" },
        { icon: HiOutlineSparkles, value: 100, suffix: "+", label: "Topics" },
    ];

    return (
        <div
            ref={bannerRef}
            className="relative min-h-[100vh] w-full overflow-hidden"
        >
            {/* Layered Background */}
            <motion.div
                className="absolute inset-0 will-change-transform"
                style={{ y: bgY }}
            >
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1e] via-[#0f172a] to-[#1a1a3e]" />

                {/* Background image with blend */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop')" }}
                />

                {/* Noise texture */}
                <div className="absolute inset-0 noise-overlay" />

                {/* Grid pattern */}
                <div className="absolute inset-0 grid-pattern" />

                {/* Gradient overlays for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1e]/60 via-transparent to-[#0a0f1e]/60" />
            </motion.div>

            {/* Floating Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none will-change-transform">
                <motion.div
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 15, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 right-[15%] w-64 h-64 bg-secondary/15 rounded-full blur-[80px]"
                />
                <motion.div
                    animate={{
                        y: [0, 20, 0],
                        x: [0, -20, 0],
                        scale: [1, 1.15, 1],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/4 left-[10%] w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        y: [0, -15, 0],
                        x: [0, 10, 0],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/3 left-[30%] w-40 h-40 bg-teal-400/10 rounded-full blur-[60px]"
                />
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full animate-particle"
                        style={{
                            left: `${15 + i * 15}%`,
                            bottom: `-5%`,
                            animationDelay: `${i * 2.5}s`,
                            animationDuration: `${12 + i * 3}s`,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <motion.div
                className="relative z-10 flex flex-col justify-center items-center text-center px-4 pt-32 pb-20 min-h-[100vh] max-w-6xl mx-auto"
                style={{ opacity: contentOpacity, y: contentY }}
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mb-8"
                >
                    <span className="inline-flex items-center gap-2 glass-tag text-xs uppercase tracking-[0.2em] font-bold">
                        <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                        Welcome to DialogueDock
                    </span>
                </motion.div>

                {/* Staggered Headline */}
                <div className="mb-6 flex flex-wrap justify-center gap-x-5 gap-y-1">
                    {headlineWords.map((word, i) => (
                        <motion.span
                            key={word}
                            custom={i}
                            variants={wordVariants}
                            initial="hidden"
                            animate="visible"
                            className={`text-5xl md:text-7xl lg:text-8xl font-bold font-montserrat leading-tight tracking-tight ${word === "Conversations"
                                ? "gradient-text"
                                : "text-white"
                                }`}
                        >
                            {word}
                        </motion.span>
                    ))}
                </div>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
                >
                    Your gateway to a global community of thinkers, creators, and innovators.
                    Share ideas, discover perspectives, and join the dialogue.
                </motion.p>

                {/* Dual CTA Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.5 }}
                >
                    <Link
                        to="/membership"
                        className="btn-shimmer magnetic-hover bg-gradient-to-r from-secondary to-teal-400 text-white px-8 py-3.5 rounded-full text-base font-bold shadow-glow-teal hover:shadow-glow-teal-lg transition-all duration-300"
                    >
                        Start Exploring
                    </Link>
                    <Link
                        to="/signup"
                        className="magnetic-hover bg-white/10 backdrop-blur-md text-white px-8 py-3.5 rounded-full text-base font-bold border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                    >
                        Join the Community
                    </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                    ref={statsRef}
                    className="grid grid-cols-3 gap-4 md:gap-8 w-full max-w-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            className="stat-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 1.4 + i * 0.15, duration: 0.5 }}
                        >
                            <stat.icon className="text-secondary text-2xl mx-auto mb-2" />
                            <p className="text-2xl md:text-3xl font-bold text-white font-montserrat">
                                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                            </p>
                            <p className="text-gray-400 text-xs md:text-sm mt-1">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Trending Tags */}
                <motion.div
                    className="mt-12 flex flex-wrap justify-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                >
                    <span className="text-xs text-gray-400 uppercase tracking-[0.15em] font-bold pt-2.5 mr-2">
                        Trending:
                    </span>
                    {tags.map((tag, i) => (
                        <motion.div
                            key={tag}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 2.0 + i * 0.1 }}
                        >
                            <Link to={`/tags/${tag}`} className="glass-tag capitalize cursor-pointer inline-block">
                                #{tag}
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
            >
                <span className="text-gray-400 text-xs uppercase tracking-[0.2em]">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <IoArrowDown className="text-gray-400 text-xl" />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Banner;
