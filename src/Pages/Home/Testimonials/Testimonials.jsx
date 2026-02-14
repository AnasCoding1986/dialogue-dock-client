import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Sarah Chen',
            role: 'Software Engineer',
            avatar: '👩‍💻',
            text: 'DialogueDock has become my go-to platform for tech discussions. The real-time updates and rich text editor make collaboration seamless!',
            rating: 5
        },
        {
            name: 'Marcus Johnson',
            role: 'Community Manager',
            avatar: '👨‍💼',
            text: 'I love how easy it is to organize conversations by tags. Finding relevant discussions has never been simpler.',
            rating: 5
        },
        {
            name: 'Priya Sharma',
            role: 'Content Creator',
            avatar: '✍️',
            text: 'The voting system helps quality content rise to the top. It\'s refreshing to see a platform that values substance over noise.',
            rating: 5
        }
    ];

    return (
        <div className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-montserrat">
                        What Our Community Says
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-secondary to-accent mx-auto"></div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 relative"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                        >
                            <FaQuoteLeft className="text-4xl text-accent mb-4 opacity-50" />

                            <p className="text-gray-700 leading-relaxed mb-6 min-h-[100px]">
                                "{testimonial.text}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="text-5xl">{testimonial.avatar}</div>
                                <div>
                                    <h4 className="font-bold text-primary text-lg">{testimonial.name}</h4>
                                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                                    <div className="flex gap-1 mt-2">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <FaStar key={i} className="text-yellow-400 text-sm" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
