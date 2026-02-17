import { motion } from 'framer-motion';

const SectionTitle = ({ heading, subHeading }) => {
    return (
        <motion.div
            className="max-w-3xl my-12 text-center mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {subHeading && (
                <p className="text-secondary font-montserrat text-sm md:text-base font-semibold tracking-widest uppercase mb-3 opacity-90">
                    {subHeading}
                </p>
            )}
            <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-primary mb-4 leading-tight">
                {heading}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary to-accent mx-auto rounded-full"></div>
        </motion.div>
    );
};

export default SectionTitle;