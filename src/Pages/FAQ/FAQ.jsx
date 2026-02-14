import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaChevronDown, FaQuestion } from 'react-icons/fa';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            category: 'Getting Started',
            questions: [
                {
                    q: 'How do I create an account?',
                    a: 'Click the "Join Us" button in the navbar, fill out the registration form with your email and password, and verify your email address. You\'ll be ready to start posting immediately!'
                },
                {
                    q: 'Can I post without creating an account?',
                    a: 'No, you need to create a free account to post, comment, and vote. However, you can browse public posts without logging in.'
                },
                {
                    q: 'What are tags and how do I use them?',
                    a: 'Tags are categories like "coding", "travel", or "food" that help organize discussions. Select a tag when creating a post to help others discover your content.'
                }
            ]
        },
        {
            category: 'Posting & Engagement',
            questions: [
                {
                    q: 'How many posts can I create?',
                    a: 'Free users can create up to 5 posts. Member and Premium subscribers enjoy unlimited posts.'
                },
                {
                    q: 'Can I edit or delete my posts?',
                    a: 'Yes! You can edit or delete your own posts at any time from your profile or the post page.'
                },
                {
                    q: 'How does the voting system work?',
                    a: 'Upvote posts you find valuable or downvote those that don\'t contribute. Popular posts (with high upvotes) rank higher in the feed.'
                },
                {
                    q: 'What is the rich text editor?',
                    a: 'Our rich text editor allows you to format posts with bold, italics, lists, and more. It\'s available to all users for creating engaging content.'
                }
            ]
        },
        {
            category: 'Membership & Billing',
            questions: [
                {
                    q: 'What\'s the difference between Free and Member plans?',
                    a: 'Members get unlimited posts, an ad-free experience, priority support, and a member badge. Free users are limited to 5 posts but have access to all core features.'
                },
                {
                    q: 'How do I upgrade my account?',
                    a: 'Visit the Pricing page, select your desired plan, and complete the payment process through our secure Stripe checkout.'
                },
                {
                    q: 'Can I cancel my membership anytime?',
                    a: 'Absolutely! You can cancel anytime from your account settings. You\'ll retain access until the end of your billing period.'
                },
                {
                    q: 'Do you offer refunds?',
                    a: 'We offer a 14-day money-back guarantee for new memberships. Contact support if you\'re not satisfied.'
                }
            ]
        },
        {
            category: 'Account & Privacy',
            questions: [
                {
                    q: 'How do I reset my password?',
                    a: 'Click "Forgot Password" on the login page, enter your email, and follow the instructions sent to your inbox.'
                },
                {
                    q: 'Is my data secure?',
                    a: 'Yes! We use JWT authentication, encrypted connections, and follow industry-standard security practices to protect your information.'
                },
                {
                    q: 'Can I delete my account?',
                    a: 'Yes, you can permanently delete your account from your settings. This action is irreversible and will remove all your data.'
                },
                {
                    q: 'Do you sell my data?',
                    a: 'Never. We respect your privacy and do not sell or share your personal information with third parties.'
                }
            ]
        },
        {
            category: 'Technical Support',
            questions: [
                {
                    q: 'The site isn\'t loading properly. What should I do?',
                    a: 'Try clearing your browser cache, disabling extensions, or using an incognito window. If issues persist, contact our support team.'
                },
                {
                    q: 'Are there mobile apps?',
                    a: 'Currently, DialogueDock is optimized for mobile browsers. Native iOS and Android apps are on our roadmap!'
                },
                {
                    q: 'How do I report a bug or suggest a feature?',
                    a: 'Use the "Help Center" link in the footer or email support@dialoguedock.com. We love hearing from our community!'
                }
            ]
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    let questionIndex = 0;

    return (
        <>
            <Helmet>
                <title>FAQ | DialogueDock Help Center</title>
            </Helmet>

            {/* Hero Section */}
            <div className="relative min-h-[350px] bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
                </div>

                <motion.div
                    className="relative z-10 max-w-4xl mx-auto text-center px-4 py-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <FaQuestion className="text-6xl mx-auto mb-6 opacity-80" />
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">Questions</span>
                    </h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                        Find answers to common questions about DialogueDock
                    </p>
                </motion.div>
            </div>

            {/* FAQ Content */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4">
                    {faqs.map((category, catIndex) => (
                        <div key={catIndex} className="mb-12">
                            <motion.h2
                                className="text-3xl font-bold text-primary mb-6"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                {category.category}
                            </motion.h2>

                            <div className="space-y-4">
                                {category.questions.map((faq) => {
                                    const currentIndex = questionIndex++;
                                    const isOpen = openIndex === currentIndex;

                                    return (
                                        <motion.div
                                            key={currentIndex}
                                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: (currentIndex % 3) * 0.1 }}
                                        >
                                            <button
                                                onClick={() => toggleFAQ(currentIndex)}
                                                className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                                            >
                                                <h3 className="text-lg font-bold text-primary pr-4">
                                                    {faq.q}
                                                </h3>
                                                <motion.div
                                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="flex-shrink-0"
                                                >
                                                    <FaChevronDown className="text-secondary text-xl" />
                                                </motion.div>
                                            </button>

                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-6 pb-6 pt-2 text-gray-700 leading-relaxed border-t border-gray-100">
                                                            {faq.a}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Still Need Help Section */}
            <div className="py-20 bg-white">
                <motion.div
                    className="max-w-4xl mx-auto text-center px-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Still Need Help?</h2>
                    <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                        Can't find what you're looking for? Our support team is here to help!
                    </p>
                    <a
                        href="mailto:support@dialoguedock.com"
                        className="btn btn-primary btn-lg text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                    >
                        Contact Support
                    </a>
                </motion.div>
            </div>
        </>
    );
};

export default FAQ;
