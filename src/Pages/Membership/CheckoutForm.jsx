import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";


const CheckoutForm = () => {

    const [pErr, setPErr] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId,setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const pAmount = 100;

    useEffect(() => {
        axiosSecure.post("/create-payment-intent", { price: pAmount })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosSecure])

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setPErr(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setPErr('');
        }


        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous',
                    },
                },
            })

            if (confirmError) {
                console.log('confirmError');
            } else {
                console.log('Payment intent', paymentIntent);
                if (paymentIntent.status === 'succeeded') {
                    console.log('transaction id', paymentIntent.id);
                    setTransactionId(paymentIntent.id)
                }
            }


    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn bg-[#050C9C] text-white mt-4 btn-sm" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{pErr}</p>
            {
                transactionId && <p className="text-green-600">Your transaction id : {transactionId}</p>
            }
        </form>
    );
};

export default CheckoutForm;