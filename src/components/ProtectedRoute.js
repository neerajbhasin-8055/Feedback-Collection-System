// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ token, children }) => {
    if (!token) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
