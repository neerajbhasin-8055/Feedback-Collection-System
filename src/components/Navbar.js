// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = ({ userName, onLogout }) => {
    const token = localStorage.getItem('token')
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl">Feedback App</div>
                <div className="text-white">Hello, {userName}</div>
                <button
                    onClick={onLogout}
                    className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-500"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
