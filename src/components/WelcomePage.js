import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <h1 className="text-3xl font-bold mb-4 text-center">Feedback Collection System</h1>
                <h2 className="text-2xl font-semibold mb-4 text-center">Welcome</h2>
                <p className="text-center mb-4">Collect and manage feedback efficiently</p>
                <p className="text-center mb-6">Login to access your dashboard or register to create a new account.</p>
                <div className="flex justify-center gap-4 mb-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate('/register')}
                        className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                        Register
                    </button>
                </div>
                <div className="text-center text-xs mt-4">
                    <p className="mb-1">Secure • Easy to use • Insightful</p>
                    <p>© 2024 Feedback Collection System. All rights reserved.</p>
                </div>
            </div>
    );
};

export default WelcomePage;
