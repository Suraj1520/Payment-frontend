import './payment.css';
import React, { useState } from "react";
import getCookie from "../jwtToken/jwtToken";
import { BsFillCreditCardFill } from 'react-icons/bs';
import { useNavigate, useLocation } from "react-router-dom";

import Form from "../payment/form"

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const Payment = () => {

    const navigate = useNavigate();
    const token = getCookie('jwt');
    if (!token) navigate("/login");


    const { state } = useLocation();

    const data = state;
    
    // if (!data || data.length === 0 ) {
    //     navigate("/pricing");
    //     // return null;
    // }

    const stripePromise = loadStripe(process.env.REACT_APP_KEY);

    return (
        <div className="payment-container">
            <Elements stripe={stripePromise} >
                <Form data={data}/>
            </Elements>
            <div className="plan-detail">
                <div className="heading1">Order Summary</div>
                <div className="plan-values">
                    <div>Plan Name</div>
                    <div className="data">{data ? data.planName : " "}</div>
                </div>
                <div className="plan-values">
                    <div>Billing Cycle</div>
                    <div className="data">{data && data.billingCycle === "monthly" ? "Monthly" : "Yearly"}</div>
                </div>
                <div className="plan-values">
                    <div>Plan Price</div>
                    <div className="data">{data && data.planPrice}/{data && data.billingCycle === "monthly" ? "mo" : "yr"}</div>
                </div>
            </div>
        </div>
    );
};

export default Payment;