import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing token
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (id, password, role = 'patient') => {
        try {
            let data;
            if (role === 'doctor') {
                data = await api.auth.loginDoctor(id, password);
                // Backend returns { success, token, doctor: {...} }
                localStorage.setItem('token', data.token);
                // Normalize user object for frontend usage
                const userObj = { ...data.doctor, role: 'doctor' };
                localStorage.setItem('user', JSON.stringify(userObj));
                setUser(userObj);
            } else {
                data = await api.auth.loginPatient(id, password);
                // Backend returns { success, token, patient: {...} }
                localStorage.setItem('token', data.token);
                // Normalize user object
                const userObj = { ...data.patient, role: 'patient' };
                localStorage.setItem('user', JSON.stringify(userObj));
                setUser(userObj);
            }
            return { success: true };
        } catch (error) {
            console.error("Login Error:", error);
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
