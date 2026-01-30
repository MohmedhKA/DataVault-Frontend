import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import MainLayout from '../layouts/MainLayout';
import Card from '../components/ui/Card';
import { Activity, Calendar, ShieldCheck, User } from 'lucide-react';

const AuditHistory = () => {
    const { user } = useAuth();
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        // Mock data loading or fetch from API
        const fetchLogs = async () => {
            // Ideally fetch from backend
            // const data = await api.access.getAuditTrail(user.patientID);
            // Mocking for visual demo as requested by user for "unique pages"
            setLogs([
                { id: 1, action: "Access Granted", actor: "You", target: "Dr. Smith", timestamp: Date.now() - 3600000, details: "For Routine Checkup (24h)" },
                { id: 2, action: "Data Viewed", actor: "Dr. Smith", target: "Health Record #492", timestamp: Date.now() - 1800000, details: "Accessed Vitals Section" },
                { id: 3, action: "Access Revoked", actor: "You", target: "Dr. Jones", timestamp: Date.now() - 86400000, details: "Manual revocation" },
                { id: 4, action: "Login", actor: "You", target: "System", timestamp: Date.now() - 90000000, details: "Biometric Auth Success" },
            ]);
        };
        if (user) fetchLogs();
    }, [user]);

    return (
        <MainLayout>
            <div className="animate-fade-in">
                <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Audit Trail <span style={{ color: 'var(--text-muted)' }}>/ History</span></h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Complete transparency of all actions on your account.</p>
                </div>

                <Card>
                    <div style={{ position: 'relative', paddingLeft: '2rem' }}>
                        {/* Timeline Line */}
                        <div style={{
                            position: 'absolute', top: '0', bottom: '0', left: '19px',
                            width: '2px', background: 'var(--glass-border)'
                        }} />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {logs.map((log, index) => (
                                <div key={log.id} style={{ position: 'relative', paddingLeft: '2rem' }}>
                                    {/* Timeline Dot */}
                                    <div style={{
                                        position: 'absolute', left: '-2.1rem', top: '0',
                                        width: '40px', height: '40px',
                                        background: 'var(--bg-secondary)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: log.action.includes("Revoked") ? '#ef4444' : '#6366f1',
                                        boxShadow: '0 0 15px rgba(0,0,0,0.2)'
                                    }}>
                                        {log.action.includes("Login") ? <ShieldCheck size={18} /> :
                                            log.action.includes("Viewed") ? <Activity size={18} /> :
                                                <User size={18} />}
                                    </div>

                                    <div className="glass-panel" style={{
                                        padding: '1.5rem',
                                        background: 'linear-gradient(to bottom right, rgba(30, 41, 59, 0.4), rgba(30, 41, 59, 0.1))'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)' }}>{log.action}</h3>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <Calendar size={14} /> {new Date(log.timestamp).toLocaleString()}
                                            </span>
                                        </div>
                                        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                            <strong style={{ color: '#e2e8f0' }}>{log.actor}</strong> {log.action.toLowerCase()} access for <strong style={{ color: '#e2e8f0' }}>{log.target}</strong>
                                        </p>
                                        <div style={{
                                            fontSize: '0.85rem',
                                            background: 'rgba(0,0,0,0.2)',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '8px',
                                            width: 'fit-content',
                                            color: 'var(--text-muted)'
                                        }}>
                                            Details: {log.details}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </MainLayout>
    );
};

export default AuditHistory;
