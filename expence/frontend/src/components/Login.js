import React, { useState } from 'react';
import axios from 'axios';
import './CssFiles/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/users/login', credentials);

            if (response.status === 200) {
                const { token } = response.data;
                sessionStorage.setItem('token', token);
                console.log('Login successful!');
                navigate('/dashboard');
            } else {
                console.error('Login failed:', response.data.error);
            }
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>
                    <span>Username:</span>
                    <br/>
                    <input type="text" name="username" value={credentials.username} onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    <span>Password:</span>
                    <br/>
                    <input type="password" name="password" value={credentials.password} onChange={handleChange}/>
                </label>
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
