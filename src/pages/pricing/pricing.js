import React, { useState } from "react";
import './pricing.css';
import getCookie from "../jwtToken/jwtToken";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
    const navigate = useNavigate();
    
    const token = getCookie('jwt');
    if(token===null)navigate("/login");
    
    const [activePlan, setActivePlan] = useState(null);
    const [period, setPeriod] = useState("monthly");

    const billingCycle = ["Phone", "Basic", "Standard", "Premium"];
    const price = {
        monthly: {
            tag: "Monthly Price",
            params: ["₹ 100", "₹ 200", "₹ 500", "₹ 700"]
        },
        yearly: {
            tag: "Yearly Price",
            params: ["₹ 1000", "₹ 2000", "₹ 5000", "₹ 7000"]
        }
    }


    const data = [
        {
            tag: "Video quality",
            params: ["Good", "Good", "Better", "Best"]
        },
        {
            tag: "Resolution",
            params: ["480p", "480p", "1080p", "4k+HDR"]
        }
    ]

    const device = [
        ["Phone", "Tablet"],
        ["Phone", "Tablet", "Computer", "Tv"],
        ["Phone", "Tablet", "Computer", "Tv"],
        ["Phone", "Tablet", "Computer", "Tv"]
    ]


    const handleChange2 = () => {
        setPeriod("monthly");
    }

    const handleChange1 = () => {
        setPeriod("yearly");
    }

    const handleNext = () => {
        if (activePlan==null) alert("Select a plan first!");
        else {
            const data = {
                planName: "",
                billingCycle: "",
                planPrice: "",
                planDevice: [],
            };
            data.planName = billingCycle[activePlan];
            data.billingCycle = period;
            data.planPrice = price[period].params[activePlan];
            data.planDevice = device[activePlan];
            
            navigate("/payment", { state: data });
        }
    }

    return (
        <div className="pricing-container">
            <div className="pricing-container1">
                <div className="right-plan">Choose the right plan for you</div>
                <div className="values">
                    <div className="type">
                        <div className="type3">
                            <div className="type4" onClick={() => handleChange2()} style={{
                                backgroundColor: period === 'monthly' ? 'aliceblue' : '',
                                color: period === 'monthly' ? '#1f4d91' : 'white',
                                fontWeight: period === 'monthly' ? 'bold' : '',
                            }}>
                                Monthly
                            </div>
                            <div className="type4" onClick={() => handleChange1()} style={{
                                backgroundColor: period === 'yearly' ? 'aliceblue' : '',
                                color: period === 'yearly' ? '#1f4d91' : 'white',
                                fontWeight: period === 'yearly' ? 'bold' : '',
                            }}>
                                Yearly
                            </div>
                        </div>
                        <div className="type1">
                            {billingCycle.map((value, index) => (
                                <div className="type9" key={index}>
                                    <div className={`type2 ${activePlan !== null && activePlan === index ? 'active' : ''}`} onClick={() => setActivePlan(index)}>{value}</div>
                                    <div className="square">    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="second-type" >
                        <div className="type5">{price[period].tag}</div >
                        <div className="type1">
                            {price[period].params.map((param, paramIndex) => (
                                <div className={`type6 ${activePlan !== null && paramIndex === activePlan ? 'active' : ''}`} key={paramIndex}>{param}</div>
                            ))}
                        </div>
                    </div>

                    {
                        data.map((res, index) => (
                            <div className="second-type" key={index}>
                                <div className="type5">{res.tag}</div >
                                <div className="type1">
                                    {res.params.map((param, paramIndex) => (
                                        <div className={`type6 ${activePlan !== null && paramIndex === activePlan ? 'active' : ''}`} key={paramIndex}>{param}</div>
                                    ))}
                                </div>
                            </div>
                        ))
                    }

                    <div className="second-type border">

                        <div className="type5 ">Devices you can use to watch</div >
                        <div className="type8">
                            {
                                device.map((column, columnIndex) => (
                                    <div className={`type10 ${activePlan !== null && columnIndex === activePlan ? 'active' : ''}`} key={columnIndex}>
                                        {column.map((deviceItem, rowIndex) => (
                                            <div className="type7" key={rowIndex}>{deviceItem}</div>
                                        ))}
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div>

                    </div>
                </div>
                <div className="next1" >
                    <div className="next" onClick={() => handleNext()}>Next</div>
                </div>
            </div>
        </div >
    );
};

export default Pricing;