import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import FeedbackForm from './components/FeedbackForm';
import Login from './components/Login';
import Register from './components/Register';
import WelcomePage from './components/WelcomePage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserName = localStorage.getItem('userName');

        if (storedToken) {
            setToken(storedToken);
        }
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);

    const handleSetToken = (token, name) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userName', name);
        setToken(token);
        setUserName(name);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        setToken(null);
        setUserName('');
        navigate('/welcome');
    };

    return (
        <Routes>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/login" element={
                token ? <Navigate to="/" /> : <Login setToken={handleSetToken} />
            } />
            <Route path="/register" element={
                token ? <Navigate to="/" /> : <Register />
            } />
            <Route path="/" element={
                token ? (
                    <ProtectedRoute token={token}>
                        <FeedbackForm userName={userName} onLogout={handleLogout} />
                    </ProtectedRoute>
                ) : (
                    <Navigate to="/welcome" />
                )
            } />
            {/* Fallback route to redirect to welcome page */}
            <Route path="*" element={<Navigate to="/welcome" />} />
        </Routes>
    );
}

export default App;
