import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaHome, FaCompass, FaQuestionCircle } from 'react-icons/fa';

const NotFound = () => {
    return (
        <>
            <Helmet>
                <title>404 - Page Not Found | DialogueDock</title>
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
                <motion.div
                    className="max-w-2xl text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Animated 404 */}
                    <motion.div
                        className="mb-8"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            repeatDelay: 2
                        }}
                    >
                        <h1 className="text-9xl md:text-[200px] font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-none">
                            404
                        </h1>
                    </motion.div>

                    {/* Message */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                            Oops! Page Not Found
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                            The page you're looking for seems to have sailed away. Let's get you back on course!
                        </p>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Link
                            to="/"
                            className="btn btn-primary btn-lg text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                        >
                            <FaHome className="mr-2" />
                            Back to Home
                        </Link>
                        <Link
                            to="/features"
                            className="btn btn-outline btn-primary btn-lg font-bold hover:scale-105 transition-all"
                        >
                            <FaCompass className="mr-2" />
                            Explore Features
                        </Link>
                    </motion.div>

                    {/* Help Link */}
                    <motion.div
                        className="mt-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        <p className="text-gray-600 mb-4">Need help finding something?</p>
                        <Link
                            to="/faq"
                            className="inline-flex items-center text-secondary hover:text-primary font-semibold transition-colors"
                        >
                            <FaQuestionCircle className="mr-2" />
                            Visit our FAQ
                        </Link>
                    </motion.div>

                    {/* Decorative Elements */}
                    <div className="absolute top-10 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl -z-10"></div>
                </motion.div>
            </div>
        </>
    );
};

export default NotFound;
