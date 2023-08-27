
import React, { useState } from "react";
import './payment.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import getCookie from "../jwtToken/jwtToken";
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';


const Form = (props) => {

    const navigate = useNavigate();
    const token1 = getCookie('jwt');

    const stripe = useStripe();
    const elements = useElements();

    const data = props.data;

    const pay = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet.
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { token, error } = await stripe.createToken(cardElement);

        if (error) {
            console.error(error);
        } else {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/subscriptionPurchased`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token1}` // Add your JWT token here
                    }
                })
                if (response && response.data.message === "Successfully saved") {
                    navigate("/myplan");
                }
            }
            catch (error) {
                // Handle errors
                console.log(error);
            }
            // Send the token to your backend for processing
        }
    };

    return (
        <div className="payment-details">
            <div className="heading">Complete Payment</div>
            <div className="heading2">Enter your credit or debit card details below</div>
            <form onSubmit={pay}>
                <CardElement className="StripeElement" options={{ style: { base: { fontSize: '12px' } } }} />
                <div className="confirm">
                    <button type="submit">Confirm Payment</button>
                </div>
            </form>
        </div>
    );
};

export default Form;