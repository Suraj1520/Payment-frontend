import React, { useState } from "react";
import "./signup.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import getCookie from "../jwtToken/jwtToken";
import Loader from '../loader/loader';

const SignUp = () => {

    const token = getCookie('jwt');

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        rememberMe: false
    });

    const [loading, setLoading] = useState("false");

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData({
            ...formData,
            [name]: newValue
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        addUser();
    };

    const addUser = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/signUp`,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    emailId: formData.email,
                    password: formData.password,
                }),
            })

            if (response && response.status === 402) alert("Something went wrong");
            else if(response && response.status===400)
            {
                alert("User already exist, Go to login page!");
                navigate("/login");
            }
            else navigate("/login");
        }
        catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    return (
        <div className="signup-container">
            <div className="form-heading">Create Account</div>
            <form onSubmit={handleSubmit}>
                <div className="form-div">
                    <div>
                        <div className="form-value-heading">Name</div>
                        <input className="form-value" type="name" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <div className="form-value-heading">Email</div>
                        <input className="form-value" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <div className="form-value-heading">Password</div>
                        <input className="form-value" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div>
                        <div className="remember">
                            <div>
                                <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />
                            </div>
                            <div className="remember-me">
                                Remember Me
                            </div>
                        </div>
                    </div>
                    <div className="button">
                        {loading ? <button className="signup-button" type="submit">Sign Up</button>
                            : <Loader />}
                    </div>
                </div>
                <div className="footer">Already have an account?&nbsp;<a href="/login" style={{ textDecoration: 'none' }}><div className="link">Login</div></a></div>
            </form>
        </div>
    );
};

export default SignUp;