import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MdBugReport } from "react-icons/md";

const ReportedActivities = () => {
    return (
        <>
            <Helmet>
                <title>DialogueDock | Reported Activities</title>
            </Helmet>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold font-montserrat text-primary mb-2">
                        🚨 Reported Activities
                    </h1>
                    <p className="text-gray-600 font-montserrat">
                        Review and manage reported content and user activities
                    </p>
                </motion.div>

                {/* Empty State */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12"
                >
                    <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center">
                            <MdBugReport className="text-4xl text-red-400" />
                        </div>
                        <h2 className="text-2xl font-bold font-montserrat text-gray-800 mb-3">
                            No Reported Activities
                        </h2>
                        <p className="text-gray-500 font-montserrat max-w-md mx-auto">
                            When users report posts or activities, they will appear here for your review. The platform is running smoothly!
                        </p>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default ReportedActivities;
