// ============================================================================
// HEALTHCARE BLOCKCHAIN API SERVICE
// ============================================================================
// Complete API integration with your backend
// ============================================================================

const API_URL = 'http://localhost:3000/api/v1';

// Helper to get authentication headers
const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

// Generic API call handler with error handling
const apiCall = async (url, options = {}) => {
    try {
        console.log(`📤 API Call: ${options.method || 'GET'} ${url}`);
        console.log('📦 Request body:', options.body ? JSON.parse(options.body) : 'none');

        const response = await fetch(`${API_URL}${url}`, {
            ...options,
            headers: getHeaders()
        });

        const data = await response.json();
        console.log('📥 Response:', data);

        if (!response.ok) {
            // Show detailed validation errors
            if (data.details && Array.isArray(data.details)) {
                const errorMessages = data.details.map(d => `${d.field}: ${d.message}`).join(', ');
                throw new Error(errorMessages);
            }
            throw new Error(data.error || data.details || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error('❌ API Error:', error);
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Backend server is not running. Please start: npm start in backend folder');
        }
        throw error;
    }
};

export const api = {
    // ========================================================================
    // AUTHENTICATION
    // ========================================================================
    auth: {
        loginPatient: async (patientId, password) => {
            return apiCall('/auth/login/patient', {
                method: 'POST',
                body: JSON.stringify({ patientId, password })
            });
        },

        loginDoctor: async (doctorId, password) => {
            return apiCall('/auth/login/doctor', {
                method: 'POST',
                body: JSON.stringify({ doctorId, password })
            });
        },

        logout: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },

    // ========================================================================
    // PATIENT MANAGEMENT
    // ========================================================================
    patients: {
        register: async (patientData) => {
            return apiCall('/patients/register', {
                method: 'POST',
                body: JSON.stringify(patientData)
            });
        },

        getProfile: async (patientId) => {
            return apiCall(`/patients/${patientId}`, {
                method: 'GET'
            });
        },

        getAccessHistory: async (patientId) => {
            return apiCall(`/patients/${patientId}/history`, {
                method: 'GET'
            });
        }
    },

    // ========================================================================
    // DOCTOR MANAGEMENT
    // ========================================================================
    doctors: {
        register: async (doctorData) => {
            return apiCall('/doctors/register', {
                method: 'POST',
                body: JSON.stringify(doctorData)
            });
        },

        getProfile: async (doctorId) => {
            return apiCall(`/doctors/${doctorId}`, {
                method: 'GET'
            });
        },

        verify: async (doctorId) => {
            return apiCall(`/doctors/${doctorId}/verify`, {
                method: 'PUT'
            });
        }
    },

    // ========================================================================
    // ACCESS MANAGEMENT
    // ========================================================================
    access: {
        grant: async (patientId, doctorId, durationHours, purpose) => {
            return apiCall('/access/grant', {
                method: 'POST',
                body: JSON.stringify({
                    patientID: patientId,
                    doctorID: doctorId,
                    durationHours,
                    purpose
                })
            });
        },

        revoke: async (accessKey) => {
            return apiCall('/access/revoke', {
                method: 'POST',
                body: JSON.stringify({ accessKey })
            });
        },

        checkValidity: async (accessKey) => {
            return apiCall(`/access/check/${accessKey}`, {
                method: 'GET'
            });
        },

        getActiveAccesses: async (patientId) => {
            return apiCall(`/access/patient/${patientId}`, {
                method: 'GET'
            });
        }
    },

    // ========================================================================
    // HEALTH CHECK
    // ========================================================================
    health: async () => {
        const response = await fetch('http://localhost:3000/health');
        return response.json();
    }
};

export default api;
