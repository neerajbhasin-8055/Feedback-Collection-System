// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/login', { email, password });
            const { token, name } = response.data; // Adjust based on your API response
            setToken(token, name); // Store token and name
            setMessage('Login successful!');
            navigate('/');
        } catch (error) {
            setMessage('Error logging in.');
        }
    };

    const goToSignUp = () =>{
        navigate('/register');
    }

    return (
        <div className="bg-gray-100 flex justify-center items-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6">Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-gray-800 text-white px-4 py-2 w-[100%] mb-4 rounded-md c"
                    >
                        Login
                    </button>
                    <div className='flex justify-center'>
                        <span className='mx-2 text-center'>Don't have an account?</span>
                        <a className='cursor-pointer underline text-blue-500' onClick={goToSignUp}>Sign up</a>
                    </div>
                    {message && <p className="mt-4 text-center">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
