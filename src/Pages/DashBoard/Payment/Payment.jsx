import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CHeckOutForm from "./CHeckOutForm";

// import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {

    return (
        <div className="p-4">
            <SectionTitle
                heading="Payment"
                subHeading="complete payment to get the membership"
            ></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                    <CHeckOutForm></CHeckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;