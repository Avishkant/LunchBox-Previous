import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Ensure you have react-toastify installed and imported
import './Register.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

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
                            Login <i className="fa-solid fa-registered fa-bounce fa-xs"></i>
                        </h1>
                        <img src="/image/logo.svg" alt="" />
                    </header>
                    <main className="signup-body">
                        <form onSubmit={handleOnSubmit} method="post">
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
                            <button type="submit">Login</button>
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

export default Login;
