import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
    HiOutlineCheckCircle,
    HiOutlineBolt,
    HiOutlineSparkles,
    HiOutlineStar,
    HiOutlineArrowRight,
    HiOutlineChatBubbleLeftRight,
    HiOutlineShieldCheck,
    HiOutlineArrowPath,
} from 'react-icons/hi2';
import useAuth from '../../Hooks/useAuth';

const Membership = () => {
    const { user } = useAuth();

    const features = [
        { icon: HiOutlineArrowPath, text: 'Unlimited Posts', desc: 'Share as many ideas as you want, no limits.' },
        { icon: HiOutlineSparkles, text: 'Gold Badge', desc: 'Stand out with a premium member badge on your profile.' },
        { icon: HiOutlineBolt, text: 'Priority Feed', desc: 'Your posts get boosted visibility in the community.' },
        { icon: HiOutlineChatBubbleLeftRight, text: 'Exclusive Discussions', desc: 'Access members-only threads and channels.' },
        { icon: HiOutlineShieldCheck, text: 'Verified Status', desc: 'Gain trust with a verified checkmark on your posts.' },
        { icon: HiOutlineStar, text: 'Early Access', desc: 'Be the first to try new platform features.' },
    ];

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
    };

    return (
        <>
            <Helmet>
                <title>DialogueDock | Membership</title>
            </Helmet>

            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
                <div className="absolute top-10 right-[20%] w-72 h-72 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-10 left-[15%] w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

                <div className="max-w-6xl mx-auto px-5 relative z-10">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6">
                            <HiOutlineSparkles className="text-sm" />
                            Premium Membership
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold text-primary font-montserrat mb-5 leading-tight">
                            Unlock Your Full{' '}
                            <span className="gradient-text">Potential</span>
                        </h1>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
                            One-time payment, lifetime benefits. Join our premium community and elevate your DialogueDock experience.
                        </p>
                    </motion.div>

                    {/* Pricing Card */}
                    <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8 items-start">
                        {/* Price Card */}
                        <motion.div
                            className="lg:col-span-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="relative bg-white rounded-3xl border border-gray-100 shadow-glass-lg p-8 text-center overflow-hidden">
                                {/* Popular badge */}
                                <div className="absolute top-0 right-0 bg-gradient-to-l from-secondary to-teal-400 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-2xl">
                                    Lifetime Deal
                                </div>

                                {/* Icon */}
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-teal-400 flex items-center justify-center mx-auto mb-6 shadow-glow-teal">
                                    <HiOutlineStar className="text-3xl text-white" />
                                </div>

                                <h3 className="text-xl font-bold text-primary font-montserrat mb-2">Gold Membership</h3>
                                <p className="text-gray-400 text-sm mb-6">Pay once, enjoy forever</p>

                                {/* Price */}
                                <div className="mb-8">
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-gray-400 text-lg line-through mr-2">$199</span>
                                        <span className="text-5xl font-bold text-primary font-montserrat">$100</span>
                                    </div>
                                    <p className="text-gray-400 text-xs mt-2">One-time payment • No recurring fees</p>
                                </div>

                                {/* CTA */}
                                <Link
                                    to="/payment"
                                    className="btn-shimmer magnetic-hover w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-teal-400 text-white py-4 rounded-xl font-bold text-base shadow-glow-teal hover:shadow-glow-teal-lg transition-all duration-300"
                                >
                                    {user ? 'Get Membership' : 'Sign Up to Join'}
                                    <HiOutlineArrowRight className="text-lg" />
                                </Link>

                                {/* Trust */}
                                <div className="flex items-center justify-center gap-4 mt-5 text-xs text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <HiOutlineShieldCheck className="text-green-400" />
                                        Secure Payment
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <HiOutlineCheckCircle className="text-green-400" />
                                        Instant Access
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Features List */}
                        <motion.div
                            className="lg:col-span-3"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <h3 className="text-lg font-bold text-primary font-montserrat mb-6">
                                Everything you get
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {features.map((f, i) => (
                                    <motion.div
                                        key={i}
                                        variants={itemVariants}
                                        className="group flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-secondary/20 hover:shadow-glass transition-all duration-300"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                                            <f.icon className="text-lg text-secondary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-primary text-sm mb-0.5">{f.text}</h4>
                                            <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* FAQ teaser */}
                    <motion.div
                        className="mt-16 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <p className="text-gray-400 text-sm">
                            Have questions?{' '}
                            <Link to="/pricing" className="text-secondary font-semibold hover:underline">View our FAQ</Link>
                        </p>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Membership;