import { motion } from 'framer-motion';

const SectionTitle = ({ heading, subHeading }) => {
    return (
        <motion.div
            className="max-w-3xl my-14 text-center mx-auto px-4"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {subHeading && (
                <motion.p
                    className="text-secondary font-montserrat text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    <span className="inline-flex items-center gap-2">
                        <span className="w-8 h-px bg-secondary/60" />
                        {subHeading}
                        <span className="w-8 h-px bg-secondary/60" />
                    </span>
                </motion.p>
            )}
            <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-primary mb-5 leading-tight">
                {heading}
            </h2>
            <div className="flex justify-center items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-secondary/30" />
                <div className="w-16 h-1 bg-gradient-to-r from-secondary to-teal-300 rounded-full" />
                <div className="w-3 h-3 rounded-full bg-secondary/30" />
            </div>
        </motion.div>
    );
};

export default SectionTitle;