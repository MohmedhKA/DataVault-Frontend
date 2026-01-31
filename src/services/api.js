// API Base URL - matches your backend
const API_URL = 'http://localhost:3000/api/v1';

// Helper to get auth headers
const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

// Helper for API calls
const apiCall = async (url, options = {}) => {
    try {
        const response = await fetch(`${API_URL}${url}`, {
            ...options,
            headers: getHeaders()
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || data.details || 'API request failed');
        }

        return data;
    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Backend server is not running. Please start the backend.');
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
            localStorage.removeItem('userType');
            localStorage.removeItem('userId');
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
        },

        getAccessHistory: async (doctorId) => {
            return apiCall(`/doctors/${doctorId}/history`, {
                method: 'GET'
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
    // MEDICAL RECORDS (TO BE IMPLEMENTED)
    // ========================================================================
    records: {
        upload: async (patientId, recordData) => {
            return apiCall('/records/upload', {
                method: 'POST',
                body: JSON.stringify({ patientId, ...recordData })
            });
        },

        get: async (recordId) => {
            return apiCall(`/records/${recordId}`, {
                method: 'GET'
            });
        },

        getPatientRecords: async (patientId) => {
            return apiCall(`/records/patient/${patientId}`, {
                method: 'GET'
            });
        },

        update: async (recordId, updates) => {
            return apiCall(`/records/${recordId}`, {
                method: 'PUT',
                body: JSON.stringify(updates)
            });
        },

        delete: async (recordId) => {
            return apiCall(`/records/${recordId}`, {
                method: 'DELETE'
            });
        }
    },

    // ========================================================================
    // AUDIT TRAIL
    // ========================================================================
    audit: {
        getPatientAuditTrail: async (patientId) => {
            return apiCall(`/audit/patient/${patientId}`, {
                method: 'GET'
            });
        },

        getDoctorAuditTrail: async (doctorId) => {
            return apiCall(`/audit/doctor/${doctorId}`, {
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
