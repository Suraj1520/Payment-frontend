import React, { useState } from "react";
import "./signup.css";
import axios from 'axios';
import {useNavigate}from 'react-router-dom';
import getCookie from "../jwtToken/jwtToken";

const SignUp = () => {
    
    const token =  getCookie('jwt');

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        rememberMe: false
    });

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

    const addUser = async () =>{
        let config = {
            method:"post",
            url:`${process.env.REACT_APP_BASE_URL}/users/signUp`,
            data:{
                name:formData.name,
                emailId:formData.email,
                password:formData.password,
            },
        };

        try{
            const response = await axios(config);
            console.log(response);
            if(response.data && response.data.message==="User registered Successfully!")
            {
                navigate("/login");
            }
            else if(response.status===401 && response.data && response.data.message==="User already exist")
            {
                alert("User Already Exist, Please login!");
                navigate("/login");
            }
        }
        catch(err){
            console.log(err);
        }
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
                        <button className="signup-button" type="submit">Sign Up</button>
                    </div>
                </div>
                <div className="footer">Already have an account?&nbsp;<a href="/login" style={{textDecoration:'none'}}><div className="link">Login</div></a></div>
            </form>
        </div>
    );
};

export default SignUp;