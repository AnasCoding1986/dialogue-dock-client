import { motion } from 'framer-motion';
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAnnoucement from "../../../Hooks/useAnnoucement";
import AnnoucementCard from "./AnnoucementCard";

const Annoucement = () => {
    const [notification] = useAnnoucement();
    const hasNotifications = notification.length > 0;

    if (!hasNotifications) return null;

    return (
        <section id="announcements" className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-5xl mx-auto px-5">
                <SectionTitle
                    heading="Announcements"
                    subHeading="Stay Updated"
                />

                <motion.div
                    className="grid gap-5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
                >
                    {notification.map(singleNotification => (
                        <motion.div
                            key={singleNotification._id}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                            }}
                        >
                            <AnnoucementCard singleNotification={singleNotification} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Annoucement;
