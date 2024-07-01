import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Ensure you have react-toastify installed and imported
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        contact: '',
        userType: '', // Add userType to handle radio button selection
    });

    const { username, email, password, confirmPassword, contact, userType } = formData; // Destructure username

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/v1/auth/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                toast.success('Login Successful!');
                // Handle successful login (e.g., navigate to another page, store token, etc.)
            } else {
                toast.error('Login Failed');
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    return (
        <div>
            <div className="outerbox">
                <div className="innerbox">
                    <div className="main">
                        <img
                            src="/image/Screenshot_2023-02-17_at_3.52.01_AM-removebg-preview.png"
                            alt=""
                        />
                    </div>
                    <header className="signup">
                        <h1>
                            Register <i className="fa-solid fa-registered fa-bounce fa-xs"></i>
                        </h1>
                        {/* <img src="/image/logo.svg" alt="" /> */}
                        <br />
                    </header>
                    <main className="signup-body">
                        <form onSubmit={handleOnSubmit} method="post">
                            <p>
                                <label htmlFor="username">UserName</label>
                                <input
                                    type="text" // corrected type from "name" to "text"
                                    name="username" // corrected name to "username"
                                    id="username"
                                    placeholder="Enter your name"
                                    value={username}
                                    onChange={handleOnChange}
                                    required
                                />
                            </p>
                            <p>
                                <label htmlFor="email">Your Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={handleOnChange}
                                    required
                                />
                            </p>
                            <p>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={handleOnChange}
                                    required
                                />
                            </p>
                            <p>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={handleOnChange}
                                    required
                                />
                            </p>
                            <p>
                                <label htmlFor="contact">Contact</label>
                                <input
                                    type="text"
                                    name="contact"
                                    id="contact"
                                    placeholder="Enter your contact"
                                    value={contact}
                                    onChange={handleOnChange}
                                    required
                                />
                            </p>
                            <label>
                                <input
                                    type="radio"
                                    name="userType"
                                    value="tiffin-provider"
                                    checked={userType === "tiffin-provider"}
                                    onChange={handleOnChange}
                                />
                                Tiffin Service Provider
                            </label>
                            <br />
                            <label>
                                <input
                                    type="radio"
                                    name="userType"
                                    value="general-user"
                                    checked={userType === "general-user"}
                                    onChange={handleOnChange}
                                />
                                General User
                            </label>
                            <br />
                            <button type="submit">Register</button>
                        </form>
                    </main>
                    <footer className="signup-footer">
                        <p>Already Have A Registration?</p>
                        <p>
                            <a href="/payment">Renew Your Registration</a>
                        </p>
                    </footer>
                </div>
                <div className="circle c1"></div>
                <div className="circle c2"></div>
            </div>
            <script
                src="https://kit.fontawesome.com/e44ab2ef2b.js"
                crossOrigin="anonymous"
            ></script>
        </div>
    );
};

export default Register;
