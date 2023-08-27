import "./login.css";
import axios from 'axios';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import getCookie from "../jwtToken/jwtToken";
import Loader from '../loader/loader';

const Login = () => {
    
    const token = getCookie('jwt');
    
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    
    const [loading,setLoading]= useState(false);

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
        addUser();
    };

    const setCookie = (name, value, days) => {
        const expirationDays = new Date();
        expirationDays.setDate(expirationDays.getDate() + days);
        const cookieValue = encodeURIComponent(value) + (days ? `; expires=${expirationDays.toUTCString()}` : '');
        document.cookie = `${name}=${cookieValue}; path=/;`;
        navigatetoURL();

    };


    const navigatetoURL = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/getUser`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Add your JWT token here
                }
            })
            // console.log(response);
            if (response && response.data && response.data && response.data.isActive) {
                navigate("/myplan");
            }
            else navigate("/pricing");
        }
        catch (err) {
            console.log(err);
        }
    }
    
    const addUser = async () => {
        
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/login`, {
                method: "POST",
                withCredentials: true, // This enables sending cookies and other credentials
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    emailId: formData.email,
                    password: formData.password,
                }),
            })
            const data = await response.json();
            // console.log(data);
            if (data && data.message === "Authentication Successfull") {
                const token = data.token;
                setCookie('jwt', token, 1);

            }
            else if (data && data.message === "Wrong Password") {
                alert("Wrong Password");
            }
            else if (data && data.message === "User doesn't exist, Please sign up first") {
                alert("User doesn't exist, Please sign up first");
                navigate("/");
            }
        }
        catch (err) {
            console.log(err);
        }
        setLoading(false);
    };



    return (
        <div className="login-container">
            <div className="form-heading">Login to your account</div>
            <form onSubmit={handleSubmit}>
                <div className="form-div">
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
                        {!loading ?
                        <button className="signup-button">Login</button>
                        :<Loader />}
                    </div>
                </div>
                <div className="footer">New to MyApp?&nbsp;<a href="/" style={{ textDecoration: 'none' }}><div className="link">Sign Up</div></a></div>
            </form>
        </div>
    );
};

export default Login;