import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import MainLayout from '../layouts/MainLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Shield, Key, Clock, UserCheck, AlertTriangle, Trash2 } from 'lucide-react';

const PatientDashboard = () => {
    const { user, login } = useAuth(); // login for demo purposes if needed
    const [activeKeys, setActiveKeys] = useState([]);
    const [loading, setLoading] = useState(false);

    // Form State
    const [doctorID, setDoctorID] = useState('');
    const [duration, setDuration] = useState('24');
    const [purpose, setPurpose] = useState('Routine Checkup');

    // Load keys on mount
    useEffect(() => {
        if (user?.patientID) {
            loadActiveKeys();
        }
    }, [user]);

    const loadActiveKeys = async () => {
        try {
            const data = await api.access.getActiveKeys(user.patientID);
            const keys = data.activeKeys || [];
            setActiveKeys(keys);
        } catch (error) {
            console.error("Failed to load keys:", error);
        }
    };

    const handleGrantAccess = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.access.grant(doctorID, parseInt(duration), purpose);
            alert('Access Granted Successfully!');
            setDoctorID('');
            loadActiveKeys();
        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleRevoke = async (accessKey) => {
        if (!confirm('Are you sure you want to revoke this access?')) return;
        try {
            await api.access.revoke(accessKey);
            loadActiveKeys();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    if (!user) {
        // Simple Login Form for Demo if not authenticated
        const [pid, setPid] = useState('');
        const [pwd, setPwd] = useState('');

        return (
            <MainLayout>
                <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
                    <Card>
                        <h2 className="text-gradient" style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>
                            Patient Login
                        </h2>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const res = await login(pid, pwd);
                            if (!res.success) alert(res.error);
                        }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Patient ID</label>
                                <Input value={pid} onChange={(e) => setPid(e.target.value)} placeholder="Enter Patient ID" />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Password</label>
                                <Input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="Enter Password" />
                            </div>
                            <Button type="submit" style={{ width: '100%' }}>Login to Dashboard</Button>
                        </form>
                    </Card>
                </div>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <div className="animate-fade-in" style={{ paddingBottom: '3rem' }}>
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
                        Self-Confidence Portal
                    </div>
                    <h1 className="text-gradient" style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
                        Empowering {user.patientID}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 0.5rem' }}>
                        Take total <strong>command</strong> of your health records. Your data, your rules, your <strong>confidence</strong>.
                    </p>
                    <p style={{ color: 'var(--accent-color)', fontSize: '0.9rem', fontStyle: 'italic', opacity: 0.8 }}>"A good doctor's comforting and reassuring words are sometimes more powerful than the medicines." –</p>
                </header>

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
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Authorize Access</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Grant a trusted doctor temporary permission.</p>
                            </div>
                        </div>

                        <form onSubmit={handleGrantAccess}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Doctor ID</label>
                                <Input
                                    value={doctorID}
                                    onChange={(e) => setDoctorID(e.target.value)}
                                    placeholder="e.g. DOC001"
                                    required
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Duration</label>
                                    <select
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        style={{ background: '#ffffff', border: '1px solid rgba(16, 185, 129, 0.2)', color: 'var(--text-primary)', padding: '0.75rem', borderRadius: '8px', width: '100%' }}
                                    >
                                        <option value="1">1 Hour</option>
                                        <option value="6">6 Hours</option>
                                        <option value="24">24 Hours</option>
                                        <option value="168">7 Days</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Purpose</label>
                                    <select
                                        value={purpose}
                                        onChange={(e) => setPurpose(e.target.value)}
                                        style={{ background: '#ffffff', border: '1px solid rgba(16, 185, 129, 0.2)', color: 'var(--text-primary)', padding: '0.75rem', borderRadius: '8px', width: '100%' }}
                                    >
                                        <option>Routine Checkup</option>
                                        <option>Surgery</option>
                                        <option>Lab Results</option>
                                        <option>Emergency</option>
                                    </select>
                                </div>
                            </div>

                            <Button type="submit" isLoading={loading} style={{ width: '100%', padding: '1rem', background: 'var(--confidence-gradient)' }}>
                                Enable Secure Access
                            </Button>
                        </form>
                    </Card>

                    {/* Active Keys Section */}
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
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Active Access</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Permissions currently live on blockchain.</p>
                            </div>
                        </div>

                        {activeKeys.length === 0 ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '3rem 0',
                                color: 'var(--text-secondary)',
                                border: '2px dashed var(--glass-border)',
                                borderRadius: 'var(--radius-md)'
                            }}>
                                <Key size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
                                <p>No active permissions.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                                {activeKeys.map((key, index) => {
                                    const minutesLeft = Math.floor((key.expiryTime - Date.now()) / 1000 / 60);
                                    return (
                                        <div key={index} className="glass-panel" style={{
                                            padding: '1.25rem',
                                            border: '1px solid rgba(16, 185, 129, 0.1)',
                                            background: '#ffffff'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                                <div>
                                                    <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{key.doctorID}</h3>
                                                    <span style={{
                                                        fontSize: '0.7rem',
                                                        padding: '2px 8px',
                                                        background: 'rgba(245, 158, 11, 0.1)',
                                                        borderRadius: '4px',
                                                        color: 'var(--energy-color)',
                                                        fontWeight: '600',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.05em'
                                                    }}>
                                                        {key.purpose}
                                                    </span>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: minutesLeft < 60 ? 'var(--danger-color)' : 'var(--accent-color)', fontSize: '0.9rem', fontWeight: '600' }}>
                                                        <Clock size={14} />
                                                        <span>{minutesLeft > 0 ? `${minutesLeft}m left` : 'Expired'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRevoke(key.accessKey)}
                                                style={{
                                                    color: 'var(--danger-color)',
                                                    width: '100%',
                                                    justifyContent: 'center',
                                                    background: 'rgba(239, 68, 68, 0.05)',
                                                    border: '1px solid rgba(239, 68, 68, 0.1)',
                                                    borderRadius: '8px'
                                                }}
                                            >
                                                <Trash2 size={16} style={{ marginRight: '0.5rem' }} /> Revoke Immediately
                                            </Button>
                                        </div>
                                    )
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
