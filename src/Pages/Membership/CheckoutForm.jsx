import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { HiOutlineCheckCircle } from "react-icons/hi2";

const CheckoutForm = () => {
    const [pErr, setPErr] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const pAmount = 100;

    useEffect(() => {
        axiosSecure.post("/create-payment-intent", { price: pAmount })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            });
    }, [axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (card === null) return;

        setProcessing(true);
        setPErr('');

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setPErr(error.message);
            setProcessing(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            },
        });

        if (confirmError) {
            setPErr(confirmError.message);
            setProcessing(false);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Payment Failed",
                text: confirmError.message,
                showConfirmButton: false,
                timer: 2000,
                customClass: { popup: 'rounded-2xl' }
            });
            setTimeout(() => navigate('/'), 2200);
        } else {
            if (paymentIntent.status === 'succeeded') {
                axiosSecure.patch(`/users/${user.email}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Welcome to Gold!",
                                text: `${user.displayName}, you're now a premium member.`,
                                showConfirmButton: false,
                                timer: 2000,
                                customClass: { popup: 'rounded-2xl' }
                            });
                        }
                    })
                    .catch(err => {
                        console.error('Error updating membership:', err);
                    });

                setTransactionId(paymentIntent.id);
                setProcessing(false);
                setTimeout(() => navigate('/'), 2200);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Card Input */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Card Details</label>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/10 transition-all duration-200">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '15px',
                                    fontFamily: '"Inter", sans-serif',
                                    color: '#1e293b',
                                    '::placeholder': { color: '#94a3b8' },
                                    fontSmoothing: 'antialiased',
                                },
                                invalid: { color: '#ef4444' },
                            },
                        }}
                    />
                </div>
            </div>

            {/* Error */}
            <AnimatePresence>
                {pErr && (
                    <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-red-500 text-sm font-medium bg-red-50 px-4 py-2.5 rounded-xl"
                    >
                        {pErr}
                    </motion.p>
                )}
            </AnimatePresence>

            {/* Success */}
            <AnimatePresence>
                {transactionId && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-green-600 text-sm font-medium bg-green-50 px-4 py-3 rounded-xl"
                    >
                        <HiOutlineCheckCircle className="text-lg flex-shrink-0" />
                        <span>Payment successful! Redirecting...</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={!stripe || !clientSecret || processing || transactionId}
                className={`w-full py-3.5 rounded-xl font-bold text-base transition-all duration-300 ${processing || transactionId
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'btn-shimmer bg-gradient-to-r from-secondary to-teal-400 text-white shadow-glow-teal hover:shadow-glow-teal-lg'
                    }`}
            >
                {processing ? (
                    <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                    </span>
                ) : transactionId ? (
                    <span className="flex items-center justify-center gap-2">
                        <HiOutlineCheckCircle className="text-lg" />
                        Payment Complete
                    </span>
                ) : (
                    'Pay $100.00'
                )}
            </button>
        </form>
    );
};

export default CheckoutForm;
