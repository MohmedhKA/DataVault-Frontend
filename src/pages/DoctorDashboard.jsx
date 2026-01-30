import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../layouts/MainLayout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Search, User, FileText, Activity } from 'lucide-react';

const DoctorDashboard = () => {
    const { user } = useAuth();
    const [patientID, setPatientID] = useState('');
    const [accessKey, setAccessKey] = useState('');
    const [patientData, setPatientData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAccessPatient = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate fetching patient data from blockchain using access key
        await new Promise(r => setTimeout(r, 1500));

        if (accessKey === 'valid') { // Mock validation
            setPatientData({
                name: "Ravi Kumar",
                age: 45,
                bloodType: "O+",
                history: [
                    { date: "2024-01-15", diagnosis: "Hypertension", doctor: "Dr. Smith" },
                    { date: "2023-11-20", diagnosis: "Viral Fever", doctor: "Dr. Joshi" }
                ],
                vitals: { bp: "120/80", heartRate: 72 }
            });
        } else {
            // For demo, let's just show data regardless or show error
            // alert("Invalid or Expired Access Key");
            setPatientData({
                name: "Unknown Patient",
                error: "Access Denied or Key Expired"
            });
        }
        setLoading(false);
    };

    return (
        <MainLayout>
            <div className="animate-fade-in" style={{ paddingBottom: '3rem' }}>
                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.6rem 1.2rem',
                        background: 'rgba(79, 70, 229, 0.12)',
                        borderRadius: 'var(--radius-full)',
                        color: 'var(--accent-secondary)',
                        marginBottom: '1rem',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        border: '1px solid rgba(79, 70, 229, 0.2)',
                        boxShadow: 'var(--shadow-glow-strength)'
                    }}>
                        Medical Professional Portal
                    </div>
                    <h1 className="text-gradient" style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem' }}>
                        Dr. {user?.name || user?.doctorID}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Empowering patient care through secure insights.</p>
                    <p style={{ color: 'var(--accent-secondary)', fontSize: '0.95rem', fontStyle: 'italic', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
                        "A good doctor's comforting and reassuring words are sometimes more powerful than the medicines." –
                    </p>
                </header>

                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <Card style={{ marginBottom: '2rem', borderLeft: '4px solid var(--accent-secondary)' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)' }}>
                            <Search size={24} color="var(--accent-secondary)" />
                            Secure Patient Lookup
                        </h2>
                        <form onSubmit={handleAccessPatient} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Patient ID</label>
                                <Input value={patientID} onChange={e => setPatientID(e.target.value)} placeholder="e.g. PAT001" style={{ padding: '0.8rem' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Access Key</label>
                                <Input value={accessKey} onChange={e => setAccessKey(e.target.value)} placeholder="Enter Verification Key" style={{ padding: '0.8rem' }} />
                            </div>
                            <Button type="submit" isLoading={loading} style={{ height: '48px', padding: '0 2rem', background: 'var(--strength-gradient)' }}>
                                Fetch Data
                            </Button>
                        </form>
                    </Card>

                    {patientData && (
                        <div className="animate-fade-in">
                            {patientData.error ? (
                                <Card style={{ border: '1px solid #ef4444', background: 'rgba(239, 68, 68, 0.05)', textAlign: 'center', padding: '2rem' }}>
                                    <h3 style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '1.2rem' }}>{patientData.error}</h3>
                                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Please verify the patient ID and key expiration.</p>
                                </Card>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
                                    {/* Patient Profile */}
                                    <Card style={{ height: 'fit-content' }}>
                                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                            <div style={{
                                                width: '100px', height: '100px',
                                                background: 'var(--bg-secondary)',
                                                borderRadius: '50%',
                                                margin: '0 auto 1.5rem',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                border: '2px solid var(--glass-border)'
                                            }}>
                                                <User size={50} color="var(--text-muted)" />
                                            </div>
                                            <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{patientData.name}</h3>
                                            <div style={{ color: 'var(--accent-color)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{patientID}</div>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '12px', textAlign: 'center' }}>
                                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Age</div>
                                                    <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{patientData.age}</div>
                                                </div>
                                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '12px', textAlign: 'center' }}>
                                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Type</div>
                                                    <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#ef4444' }}>{patientData.bloodType}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    {/* Medical Content */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                        {/* Vitals */}
                                        <Card>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Activity size={20} color="var(--accent-color)" /> Real-time Vitals
                                            </h3>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                                <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center', border: '1px solid rgba(45, 212, 191, 0.1)' }}>
                                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Blood Pressure</div>
                                                    <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent-color)' }}>{patientData.vitals.bp}</div>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>mmHg</div>
                                                </div>
                                                <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center', border: '1px solid rgba(244, 63, 94, 0.1)' }}>
                                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Heart Rate</div>
                                                    <div style={{ fontSize: '2rem', fontWeight: '800', color: '#f43f5e' }}>{patientData.vitals.heartRate}</div>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>BPM</div>
                                                </div>
                                            </div>
                                        </Card>

                                        {/* History */}
                                        <Card>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <FileText size={20} color="var(--accent-secondary)" /> Immutable History
                                            </h3>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                {patientData.history.map((record, idx) => (
                                                    <div key={idx} style={{
                                                        padding: '1.25rem',
                                                        background: 'rgba(255,255,255,0.02)',
                                                        borderRadius: '12px',
                                                        borderLeft: '4px solid var(--accent-secondary)',
                                                        transition: 'background 0.3s ease'
                                                    }}
                                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                                                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                                                    >
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
                                                            <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>{record.diagnosis}</span>
                                                            <span style={{
                                                                fontSize: '0.75rem',
                                                                color: 'var(--text-muted)',
                                                                background: 'rgba(255,255,255,0.05)',
                                                                padding: '0.25rem 0.6rem',
                                                                borderRadius: '4px'
                                                            }}>{record.date}</span>
                                                        </div>
                                                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                            <Stethoscope size={14} /> Attending: {record.doctor}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default DoctorDashboard;
