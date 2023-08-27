import React, { useEffect, useState } from "react";
import './plan.css';
import axios from 'axios';
import getCookie from "../jwtToken/jwtToken";
import { useNavigate } from "react-router-dom";

const Plan = () => {
    const navigate = useNavigate();

    const token = getCookie('jwt');
    if (!token) navigate("/login");

    const [userData, setUserData] = useState();

    const getUser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/getUser`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Add your JWT token here
                }
            })
            if (response && response.data) {
                setUserData(response.data);
            }

        }
        catch (error) {
            // Handle errors
            console.log(error);
        }
    };


    const cancel = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/cancel`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            getUser();
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="plan-details">
            <div className="heading">
                <div className="subheading">
                    <div className="subheading1">Current Plan Details</div>
                    {userData && userData.isActive ? <div className="state">Active</div>
                        : <div className="state1">Cancelled</div>}
                </div>
                {userData && userData.isActive ? <div className="cancel" onClick={() => cancel()}>Cancel</div> : <div></div>}
            </div>
            <div className="plan-name">{userData ? userData.planName : ''}</div>
            <div className="plan-type">{userData && userData.planDevice ? userData.planDevice.map((device, index) => (
                <span key={index}>
                    {device}
                    {index < userData.planDevice.length - 1 && " + "}
                </span>
            )) : null}</div>
            <div className="plan-cost">{userData ? userData.planPrice : ''}<div className="plan-cost-cycle">{userData && userData.billingCycle === "yearly" ? " /yr" : " /mo"}</div></div>
            <a href="/pricing" style={{textDecoration:'none'}}><div className="change">{userData && userData.isActive ? "Change Plan" : "Choose Plan"}</div></a>
            <div className="message">{userData && userData.createdOn ? (
                !userData.isActive ? (
                    <>
                        Your subscription was cancelled and you will loose access to services on {" "}
                        {new Date(userData.cancelledOn).toLocaleDateString()}
                    </>
                ) : (
                    <>
                        Your subscription has started on{" "}
                        {new Date(userData.createdOn).toLocaleDateString()} and will auto renew{" "}
                        {userData.billingCycle === "yearly" ? "on the same day next year" : "monthly"}
                    </>
                )
            ) : null}</div>

        </div>
    );
};

export default Plan;