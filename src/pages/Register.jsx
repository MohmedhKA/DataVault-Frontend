import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Fingerprint, CheckCircle, Shield, ArrowRight, Loader2 } from 'lucide-react';
import { api } from '../services/api';

const Register = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        aadhaar: '',
        name: '',
        password: '',
        confirmPassword: ''
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate Blockchain Delays
        await new Promise(r => setTimeout(r, 1500)); // Verify Aadhaar
        setStep(2);

        await new Promise(r => setTimeout(r, 2000)); // Create Wallet
        setStep(3);

        await new Promise(r => setTimeout(r, 1500)); // Finalize
        setLoading(false);

        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    return (
        <MainLayout>
            <div style={{ maxWidth: '500px', margin: '3rem auto' }}>
                <Card className="animate-fade-in" style={{ padding: '2.5rem' }}>

                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h2 className="text-gradient" style={{ fontSize: '2rem', fontWeight: 'bold' }}>Create Digital Identity</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Step {step} of 3: {
                            step === 1 ? 'Verify Identity' :
                                step === 2 ? 'Creating Wallet' : 'Registration Complete'
                        }</p>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} style={{
                                height: '4px',
                                flex: 1,
                                borderRadius: '2px',
                                background: step >= i ? 'var(--accent-color)' : 'var(--glass-border)',
                                transition: 'background 0.3s ease'
                            }} />
                        ))}
                    </div>

                    {step === 1 && (
                        <form onSubmit={handleRegister} className="animate-fade-in">
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--text-muted)' }}>Aadhaar Number</label>
                                <div style={{ position: 'relative' }}>
                                    <Fingerprint style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={20} />
                                    <Input
                                        required
                                        placeholder="XXXX-XXXX-XXXX"
                                        style={{ paddingLeft: '3rem' }}
                                        value={formData.aadhaar}
                                        onChange={e => setFormData({ ...formData, aadhaar: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--text-muted)' }}>Full Name</label>
                                <Input
                                    required
                                    placeholder="As per Aadhaar"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--text-muted)' }}>Set Password</label>
                                <Input
                                    type="password"
                                    required
                                    placeholder="Min 8 characters"
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>

                            <Button type="submit" isLoading={loading} style={{ width: '100%' }}>
                                Verify & Continue <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                            </Button>
                        </form>
                    )}

                    {step === 2 && (
                        <div className="animate-fade-in" style={{ textAlign: 'center', padding: '2rem 0' }}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <Loader2 className="animate-spin" size={48} color="var(--accent-color)" style={{ margin: '0 auto' }} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Generating Blockchain Wallet...</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                Creating cryptographic key pairs and registering on Hyperledger Fabric network.
                            </p>
                            <div style={{ marginTop: '2rem' }}>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', textAlign: 'left' }}>
                                    &gt; Generating private key...<br />
                                    &gt; Creating local MSP...<br />
                                    &gt; Syncing with ordering service...<br />
                                    &gt; <span style={{ color: '#10b981' }}>Success</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-fade-in" style={{ textAlign: 'center', padding: '2rem 0' }}>
                            <div style={{
                                width: '80px', height: '80px',
                                background: 'rgba(16, 185, 129, 0.2)',
                                borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: '#10b981'
                            }}>
                                <CheckCircle size={40} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Identity Created!</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                                Your health wallet is ready. Redirecting to login...
                            </p>
                        </div>
                    )}

                    {step === 1 && (
                        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            Already registered? <Link to="/login" style={{ color: 'var(--accent-color)', fontWeight: '600', textDecoration: 'none' }}>Login here</Link>
                        </div>
                    )}

                </Card>
            </div>
        </MainLayout>
    );
};

export default Register;
