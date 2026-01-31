import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import MainLayout from '../layouts/MainLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Shield, Key, Clock, UserCheck, Trash2, User, Calendar, Phone } from 'lucide-react';

const PatientDashboard = () => {
    const { user } = useAuth();
    const [activeAccesses, setActiveAccesses] = useState([]);
    const [blockchainProfile, setBlockchainProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form State
    const [doctorID, setDoctorID] = useState('');
    const [duration, setDuration] = useState('24');
    const [purpose, setPurpose] = useState('Routine Checkup');

    // Load data on mount
    useEffect(() => {
        if (user?.patientId) {
            loadDashboardData();
        }
    }, [user]);

    const loadDashboardData = async () => {
        try {
            // Load blockchain profile
            const profileData = await api.patients.getProfile(user.patientId);
            setBlockchainProfile(profileData.data);

            // Load active accesses
            const accessData = await api.access.getActiveAccesses(user.patientId);
            setActiveAccesses(accessData.data || []);
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
            setError(error.message);
        }
    };

    const handleGrantAccess = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.access.grant(
                user.patientId,
                doctorID,
                parseInt(duration),
                purpose
            );
            
            alert('✅ Access Granted Successfully!');
            setDoctorID('');
            loadDashboardData(); // Reload active accesses
        } catch (error) {
            setError(error.message);
            alert(`❌ Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleRevoke = async (accessKey) => {
        if (!confirm('Are you sure you want to revoke this access?')) return;

        try {
            await api.access.revoke(accessKey);
            alert('✅ Access revoked successfully!');
            loadDashboardData();
        } catch (error) {
            alert(`❌ Error: ${error.message}`);
        }
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleString();
    };

    const calculateTimeRemaining = (expiryTime) => {
        const now = Math.floor(Date.now() / 1000);
        const remaining = expiryTime - now;
        
        if (remaining <= 0) return 'Expired';
        
        const hours = Math.floor(remaining / 3600);
        const minutes = Math.floor((remaining % 3600) / 60);
        
        if (hours > 0) return `${hours}h ${minutes}m remaining`;
        return `${minutes}m remaining`;
    };

    if (!user) {
        return (
            <MainLayout>
                <div style={{ maxWidth: '400px', margin: '4rem auto', textAlign: 'center' }}>
                    <Card>
                        <h2>Please log in to access your dashboard</h2>
                    </Card>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="animate-fade-in" style={{ paddingBottom: '3rem' }}>
                {/* Header Section */}
                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.6rem 1.2rem',
                        background: 'rgba(16, 185, 129, 0.12)',
                        borderRadius: 'var(--radius-full)',
                        color: 'var(--accent-color)',
                        marginBottom: '1rem',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        boxShadow: 'var(--shadow-glow-confidence)'
                    }}>
                        🔗 Connected to Blockchain
                    </div>
                    <h1 className="text-gradient" style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
                        Welcome, {blockchainProfile?.name || user.name}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                        Patient ID: <strong style={{ color: 'var(--accent-color)' }}>{user.patientId}</strong>
                    </p>
                </header>

                {/* Error Display */}
                {error && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '8px',
                        padding: '1rem',
                        marginBottom: '2rem',
                        color: '#ef4444'
                    }}>
                        {error}
                    </div>
                )}

                {/* Blockchain Profile Card */}
                {blockchainProfile && (
                    <Card style={{ marginBottom: '2rem', borderLeft: '4px solid var(--accent-color)' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Shield size={24} style={{ color: 'var(--accent-color)' }} />
                            Blockchain Profile
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <User size={20} style={{ color: 'var(--accent-color)' }} />
                                <div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Name</p>
                                    <p style={{ fontWeight: '600' }}>{blockchainProfile.name}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Calendar size={20} style={{ color: 'var(--accent-color)' }} />
                                <div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Date of Birth</p>
                                    <p style={{ fontWeight: '600' }}>{blockchainProfile.dateOfBirth}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Phone size={20} style={{ color: 'var(--accent-color)' }} />
                                <div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Phone</p>
                                    <p style={{ fontWeight: '600' }}>{blockchainProfile.phone}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Shield size={20} style={{ color: 'var(--accent-color)' }} />
                                <div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Registered By</p>
                                    <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>{blockchainProfile.registeredByOrg}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2.5rem' }}>
                    {/* Grant Access Section */}
                    <Card style={{ position: 'relative', overflow: 'hidden', borderLeft: '4px solid var(--accent-color)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{
                                background: 'var(--confidence-gradient)',
                                padding: '1rem',
                                borderRadius: '16px',
                                boxShadow: 'var(--shadow-glow-confidence)',
                                color: 'white'
                            }}>
                                <UserCheck size={28} />
                            </div>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Grant Access</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Authorize a doctor to view your records</p>
                            </div>
                        </div>

                        <form onSubmit={handleGrantAccess}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: '500' }}>
                                    Doctor ID
                                </label>
                                <Input
                                    value={doctorID}
                                    onChange={(e) => setDoctorID(e.target.value)}
                                    placeholder="e.g. D9552"
                                    required
                                />
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                    Enter the verified doctor's ID
                                </p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: '500' }}>
                                        Duration
                                    </label>
                                    <select
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        style={{
                                            background: '#ffffff',
                                            border: '1px solid rgba(16, 185, 129, 0.2)',
                                            color: 'var(--text-primary)',
                                            padding: '0.75rem',
                                            borderRadius: '8px',
                                            width: '100%'
                                        }}
                                    >
                                        <option value="1">1 Hour</option>
                                        <option value="6">6 Hours</option>
                                        <option value="24">24 Hours</option>
                                        <option value="168">7 Days</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: '500' }}>
                                        Purpose
                                    </label>
                                    <select
                                        value={purpose}
                                        onChange={(e) => setPurpose(e.target.value)}
                                        style={{
                                            background: '#ffffff',
                                            border: '1px solid rgba(16, 185, 129, 0.2)',
                                            color: 'var(--text-primary)',
                                            padding: '0.75rem',
                                            borderRadius: '8px',
                                            width: '100%'
                                        }}
                                    >
                                        <option>Routine Checkup</option>
                                        <option>Surgery</option>
                                        <option>Lab Results</option>
                                        <option>Emergency</option>
                                        <option>Consultation</option>
                                    </select>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                isLoading={loading}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'var(--confidence-gradient)',
                                    fontWeight: '600'
                                }}
                            >
                                {loading ? 'Granting Access...' : '✅ Grant Access'}
                            </Button>
                        </form>
                    </Card>

                    {/* Active Accesses Section */}
                    <Card style={{ position: 'relative', overflow: 'hidden', borderLeft: '4px solid var(--energy-color)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{
                                background: 'var(--energy-gradient)',
                                padding: '1rem',
                                borderRadius: '16px',
                                boxShadow: '0 8px 16px rgba(245, 158, 11, 0.2)',
                                color: 'white'
                            }}>
                                <Shield size={28} />
                            </div>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Active Accesses</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    {activeAccesses.length} active permission{activeAccesses.length !== 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>

                        {activeAccesses.length === 0 ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '3rem 0',
                                color: 'var(--text-secondary)',
                                border: '2px dashed var(--glass-border)',
                                borderRadius: 'var(--radius-md)'
                            }}>
                                <Key size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
                                <p>No active permissions.</p>
                                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                                    Grant access to a doctor to see it here.
                                </p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '450px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                                {activeAccesses.map((access, index) => {
                                    const timeRemaining = calculateTimeRemaining(access.expiryTime);
                                    const isExpiringSoon = (access.expiryTime - Math.floor(Date.now() / 1000)) < 3600; // Less than 1 hour

                                    return (
                                        <div
                                            key={index}
                                            className="glass-panel"
                                            style={{
                                                padding: '1.25rem',
                                                border: `1px solid ${isExpiringSoon ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.1)'}`,
                                                background: '#ffffff',
                                                borderRadius: '12px'
                                            }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                                <div>
                                                    <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
                                                        {access.doctorID}
                                                    </h3>
                                                    <span style={{
                                                        fontSize: '0.75rem',
                                                        padding: '3px 10px',
                                                        background: 'rgba(245, 158, 11, 0.1)',
                                                        borderRadius: '4px',
                                                        color: 'var(--energy-color)',
                                                        fontWeight: '600'
                                                    }}>
                                                        {access.purpose}
                                                    </span>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.4rem',
                                                        color: isExpiringSoon ? '#ef4444' : 'var(--accent-color)',
                                                        fontSize: '0.9rem',
                                                        fontWeight: '600'
                                                    }}>
                                                        <Clock size={14} />
                                                        <span>{timeRemaining}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                                                <p>Granted: {formatDate(access.grantedAt)}</p>
                                                <p>Expires: {formatDate(access.expiryTime)}</p>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRevoke(access.accessKey)}
                                                style={{
                                                    color: 'var(--danger-color)',
                                                    width: '100%',
                                                    justifyContent: 'center',
                                                    background: 'rgba(239, 68, 68, 0.05)',
                                                    border: '1px solid rgba(239, 68, 68, 0.1)',
                                                    borderRadius: '8px'
                                                }}
                                            >
                                                <Trash2 size={16} style={{ marginRight: '0.5rem' }} />
                                                Revoke Access
                                            </Button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </MainLayout>
    );
};

export default PatientDashboard;
