import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaCheck, FaCrown, FaRocket } from 'react-icons/fa';

const Pricing = () => {
    const tiers = [
        {
            name: 'Free',
            price: '$0',
            period: 'forever',
            description: 'Perfect for getting started',
            features: [
                'Up to 5 posts',
                'Basic text formatting',
                'Tag-based browsing',
                'Voting & commenting',
                'Community access',
                'Mobile responsive'
            ],
            cta: 'Get Started',
            link: '/signup',
            popular: false,
            gradient: 'from-gray-400 to-gray-600',
            icon: FaRocket
        },
        {
            name: 'Member',
            price: '$9',
            period: '/month',
            description: 'For active community contributors',
            features: [
                'Unlimited posts',
                'Rich text editor',
                'Priority support',
                'Member badge',
                'Ad-free experience',
                'Early access to features',
                'Profile customization',
                'Post analytics'
            ],
            cta: 'Upgrade Now',
            link: '/membership',
            popular: true,
            gradient: 'from-secondary to-primary',
            icon: FaCrown
        },

    ];

    return (
        <>
            <Helmet>
                <title>Pricing | DialogueDock Membership Plans</title>
            </Helmet>

            {/* Hero Section */}
            <div className="relative min-h-[400px] bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>

                <motion.div
                    className="relative z-10 max-w-4xl mx-auto text-center px-4 py-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">Plan</span>
                    </h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                        Start free, upgrade when you're ready. All plans include our core features.
                    </p>
                </motion.div>
            </div>

            {/* Pricing Cards */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {tiers.map((tier, index) => (
                            <motion.div
                                key={index}
                                className={`relative bg-white rounded-3xl shadow-xl overflow-hidden ${tier.popular ? 'ring-4 ring-secondary scale-105 md:scale-110' : ''}`}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                            >
                                {tier.popular && (
                                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-secondary to-primary text-white text-center py-2 font-bold text-sm">
                                        ⭐ MOST POPULAR
                                    </div>
                                )}

                                <div className={`p-8 ${tier.popular ? 'pt-14' : ''}`}>
                                    {/* Icon */}
                                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${tier.gradient} mb-6 shadow-lg`}>
                                        <tier.icon className="text-3xl text-white" />
                                    </div>

                                    {/* Plan Name */}
                                    <h3 className="text-3xl font-bold text-primary mb-2">{tier.name}</h3>
                                    <p className="text-gray-600 mb-6">{tier.description}</p>

                                    {/* Price */}
                                    <div className="mb-8">
                                        <span className="text-5xl font-bold text-primary">{tier.price}</span>
                                        <span className="text-gray-500 text-lg">{tier.period}</span>
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-4 mb-8">
                                        {tier.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <FaCheck className={`text-lg mr-3 mt-1 flex-shrink-0 bg-gradient-to-r ${tier.gradient} bg-clip-text text-transparent`} />
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    <Link
                                        to={tier.link}
                                        className={`btn w-full text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 ${tier.popular
                                            ? 'bg-gradient-to-r from-secondary to-primary border-none'
                                            : 'btn-primary'
                                            }`}
                                    >
                                        {tier.cta}
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div id="faq" className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-secondary to-accent mx-auto"></div>
                    </motion.div>

                    <div className="space-y-6">
                        {[
                            {
                                q: 'Can I upgrade or downgrade anytime?',
                                a: 'Yes! You can change your plan at any time. Upgrades take effect immediately, and downgrades apply at the end of your billing cycle.'
                            },
                            {
                                q: 'What payment methods do you accept?',
                                a: 'We accept all major credit cards, PayPal, and digital wallets through our secure payment processor Stripe.'
                            },
                            {
                                q: 'Is there a free trial for paid plans?',
                                a: 'Free users can experience our platform fully. When upgrading, you\'ll see the benefits immediately without restrictions.'
                            },
                            {
                                q: 'What happens if I cancel my membership?',
                                a: 'You\'ll retain access until the end of your billing period, then revert to the Free plan. Your posts and data remain intact.'
                            }
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-secondary transition-all"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h3 className="text-xl font-bold text-primary mb-3">{faq.q}</h3>
                                <p className="text-gray-700 leading-relaxed">{faq.a}</p>
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
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Still Have Questions?</h2>
                    <p className="text-xl mb-8 text-gray-100">
                        Our support team is here to help you choose the perfect plan.
                    </p>
                    <Link to="/signup" className="btn btn-accent btn-lg text-primary font-bold hover:scale-105 transition-all shadow-xl">
                        Get Started Free
                    </Link>
                </motion.div>
            </div>
        </>
    );
};

export default Pricing;
