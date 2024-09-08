// src/components/FeedbackForm.js
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const FeedbackForm = ({ userName, onLogout }) => {
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/submit-feedback', {
                name,
                contactNumber,
                email,
                feedbackMessage
            });
            setResponseMessage(`Thank you for your feedback, ${name}!`);
        } catch (error) {
            setResponseMessage('Error saving feedback. Please try again.');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar userName={userName} onLogout={onLogout} />
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-6">Feedback Form</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="contactNumber" className="block text-gray-700 font-medium mb-2">Contact Number</label>
                            <input
                                type="text"
                                id="contactNumber"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="feedbackMessage" className="block text-gray-700 font-medium mb-2">Feedback</label>
                            <textarea
                                id="feedbackMessage"
                                value={feedbackMessage}
                                onChange={(e) => setFeedbackMessage(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-gray-800 w-[100%] text-white px-6 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Submit Feedback
                            </button>
                        </div>
                        {responseMessage && (
                            <div className="mt-4 text-center text-gray-700">
                                {responseMessage}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FeedbackForm;
