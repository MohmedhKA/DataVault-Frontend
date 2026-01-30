const API_URL = 'http://localhost:3000/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

export const api = {
    auth: {
        loginPatient: async (patientID, password) => {
            try {
                const response = await fetch(`${API_URL}/auth/login/patient`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ patientID, password })
                });
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || 'Login failed');
                }
                return response.json();
            } catch (error) {
                console.error("Login API Error:", error);
                if (error.name === 'TypeError' && error.message.includes('fetch')) {
                    throw new Error("Backend server is not running on port 3000.");
                }
                throw error;
            }
        },
        loginDoctor: async (doctorID, password) => {
            try {
                const response = await fetch(`${API_URL}/auth/login/doctor`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ doctorID, password })
                });
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || 'Login failed');
                }
                return response.json();
            } catch (error) {
                console.error("Doctor Login API Error:", error);
                throw error;
            }
        }
    },
    access: {
        grant: async (doctorID, durationHours, purpose) => {
            const response = await fetch(`${API_URL}/access/grant`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ doctorID, durationHours, purpose })
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to grant access');
            }
            return response.json();
        },
        revoke: async (accessKey) => {
            const response = await fetch(`${API_URL}/access/revoke`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ accessKey })
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to revoke access');
            }
            return response.json();
        },
        getActiveKeys: async (patientID) => {
            const response = await fetch(`${API_URL}/access/active/${patientID}`, {
                headers: getHeaders()
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to fetch keys');
            }
            return response.json();
        }
    }
};
