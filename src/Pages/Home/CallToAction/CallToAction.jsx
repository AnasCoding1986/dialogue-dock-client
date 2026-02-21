import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineCheckCircle, HiOutlineArrowRight } from 'react-icons/hi2';

const CallToAction = () => {
    const trustItems = [
        'No credit card required',
        'Free forever plan',
        'Setup in 60 seconds'
    ];

    return (
        <section className="relative py-28 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1e] via-[#0f172a] to-[#1a1a3e]" />

            {/* Grid pattern */}
            <div className="absolute inset-0 grid-pattern opacity-40" />

            {/* Floating orbs */}
            <motion.div
                animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 right-[15%] w-64 h-64 bg-secondary/10 rounded-full blur-[80px]"
            />
            <motion.div
                animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 left-[10%] w-80 h-80 bg-purple-500/8 rounded-full blur-[100px]"
            />

            {/* Content */}
            <motion.div
                className="relative z-10 max-w-4xl mx-auto text-center px-5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                >
                    <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 text-xs text-white font-bold uppercase tracking-[0.15em]">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        Join 10,000+ Members
                    </span>
                </motion.div>

                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-montserrat leading-tight">
                    Ready to Join the{' '}
                    <span className="gradient-text">Conversation</span>?
                </h2>

                <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                    Create your free account today and become part of a community that values your voice.
                </p>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <Link
                        to="/signup"
                        className="btn-shimmer magnetic-hover inline-flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-teal-400 text-white px-8 py-4 rounded-full font-bold text-base shadow-glow-teal hover:shadow-glow-teal-lg transition-all duration-300"
                    >
                        Get Started Free
                        <HiOutlineArrowRight className="text-lg" />
                    </Link>
                    <Link
                        to="/pricing"
                        className="magnetic-hover inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold text-base border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                    >
                        View Plans
                    </Link>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                    className="flex flex-wrap justify-center gap-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    {trustItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                            <HiOutlineCheckCircle className="text-green-400 text-base flex-shrink-0" />
                            <span className="font-medium">{item}</span>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default CallToAction;
