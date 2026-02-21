import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { HiOutlineLockClosed, HiOutlineShieldCheck } from "react-icons/hi2";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    return (
        <>
            <Helmet>
                <title>DialogueDock | Payment</title>
            </Helmet>

            <section className="min-h-[80vh] flex items-center justify-center py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
                {/* Background accents */}
                <div className="absolute top-20 left-[20%] w-72 h-72 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-10 right-[15%] w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

                <motion.div
                    className="relative z-10 w-full max-w-md mx-auto px-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Card */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-glass-lg overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary to-[#1a1a3e] p-6 text-center">
                            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-3">
                                <HiOutlineLockClosed className="text-2xl text-white" />
                            </div>
                            <h2 className="text-xl font-bold text-white font-montserrat">Secure Payment</h2>
                            <p className="text-white/60 text-sm mt-1">Complete your Gold Membership purchase</p>
                        </div>

                        {/* Amount */}
                        <div className="px-8 pt-6 pb-2 text-center border-b border-gray-50">
                            <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">Amount Due</p>
                            <p className="text-4xl font-bold text-primary font-montserrat">$100<span className="text-base text-gray-400 font-normal">.00</span></p>
                            <p className="text-gray-400 text-xs mt-1 mb-4">One-time lifetime payment</p>
                        </div>

                        {/* Checkout Form */}
                        <div className="p-8">
                            <Elements stripe={stripePromise}>
                                <CheckoutForm />
                            </Elements>
                        </div>

                        {/* Trust badges */}
                        <div className="px-8 pb-6 flex items-center justify-center gap-5 text-xs text-gray-400">
                            <span className="flex items-center gap-1.5">
                                <HiOutlineShieldCheck className="text-green-400 text-sm" />
                                SSL Encrypted
                            </span>
                            <span className="flex items-center gap-1.5">
                                <HiOutlineLockClosed className="text-green-400 text-sm" />
                                Powered by Stripe
                            </span>
                        </div>
                    </div>
                </motion.div>
            </section>
        </>
    );
};

export default Payment;