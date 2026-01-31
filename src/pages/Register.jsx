import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Fingerprint, CheckCircle, Shield, ArrowRight, Loader2, User, Phone, Calendar } from 'lucide-react';
import { api } from '../services/api';

const Register = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [registeredId, setRegisteredId] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        phone: '',
        aadharNumber: '',
        password: '',
        confirmPassword: '',
        fingerprintTemplateID: Math.floor(1000 + Math.random() * 9000)
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (formData.aadharNumber.length !== 12) {
            setError('Aadhar number must be 12 digits');
            setLoading(false);
            return;
        }

        try {
            console.log('🚀 Registering patient with backend...');
            
            // Step 1: Show verifying step
            setStep(2);
            await new Promise(r => setTimeout(r, 500));

            // Call actual backend API
            const response = await api.patients.register({
                name: formData.name,
                dateOfBirth: formData.dateOfBirth,
                phone: formData.phone,
                aadharNumber: formData.aadharNumber,
                password: formData.password,
                fingerprintTemplateID: formData.fingerprintTemplateID
            });

            console.log('✅ Registration successful:', response);

            // Step 2: Show creating wallet
            setStep(3);
            await new Promise(r => setTimeout(r, 1000));

            // Step 3: Show success with patient ID
            setRegisteredId(response.data.patientID);
            setStep(4);

            // Redirect to login after 3 seconds
            setTimeout(() => {
                navigate('/login/patient');
            }, 5000);

        } catch (err) {
            console.error('❌ Registration failed:', err);
            setError(err.message || 'Registration failed. Please try again.');
            setStep(1);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div style={{ maxWidth: '550px', margin: '3rem auto' }}>
                <Card className="animate-fade-in" style={{ padding: '2.5rem', borderTop: '4px solid var(--accent-color)' }}>

                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            background: 'rgba(16, 185, 129, 0.1)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem',
                            color: 'var(--accent-color)',
                            border: '1px solid rgba(16, 185, 129, 0.3)'
                        }}>
                            <Shield size={32} />
                        </div>
                        <h2 className="text-gradient" style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                            Create Patient Account
                        </h2>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            {step === 1 && 'Enter your details to register'}
                            {step === 2 && 'Step 1 of 3: Verifying Identity'}
                            {step === 3 && 'Step 2 of 3: Creating Blockchain Wallet'}
                            {step === 4 && 'Step 3 of 3: Registration Complete'}
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} style={{
                                height: '4px',
                                flex: 1,
                                borderRadius: '2px',
                                background: step >= i + 1 ? 'var(--accent-color)' : 'var(--glass-border)',
                                transition: 'background 0.3s ease'
                            }} />
                        ))}
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '8px',
                            padding: '1rem',
                            marginBottom: '1.5rem',
                            color: '#ef4444',
                            fontSize: '0.9rem',
                            textAlign: 'center'
                        }}>
                            ❌ {error}
                        </div>
                    )}

                    {/* Step 1: Registration Form */}
                    {step === 1 && (
                        <form onSubmit={handleRegister} className="animate-fade-in">
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                                    Full Name *
                                </label>
                                <Input
                                    required
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                                        Date of Birth *
                                    </label>
                                    <Input
                                        type="date"
                                        required
                                        value={formData.dateOfBirth}
                                        onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                                        Phone Number *
                                    </label>
                                    <Input
                                        type="tel"
                                        required
                                        placeholder="+919876543210"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                                    Aadhar Number *
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <Fingerprint style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={20} />
                                    <Input
                                        required
                                        placeholder="123456789012 (12 digits)"
                                        maxLength={12}
                                        style={{ paddingLeft: '3rem' }}
                                        value={formData.aadharNumber}
                                        onChange={e => setFormData({ ...formData, aadharNumber: e.target.value.replace(/\D/g, '') })}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                                    Password *
                                </label>
                                <Input
                                    type="password"
                                    required
                                    placeholder="Min 8 characters"
                                    minLength={8}
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                                    Confirm Password *
                                </label>
                                <Input
                                    type="password"
                                    required
                                    placeholder="Re-enter password"
                                    value={formData.confirmPassword}
                                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                                />
                            </div>

                            <Button type="submit" isLoading={loading} disabled={loading} style={{ width: '100%', padding: '1rem', background: 'var(--confidence-gradient)' }}>
                                {loading ? 'Registering...' : 'Register on Blockchain'}
                                {!loading && <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />}
                            </Button>
                        </form>
                    )}

                    {/* Step 2: Verifying */}
                    {step === 2 && (
                        <div className="animate-fade-in" style={{ textAlign: 'center', padding: '2rem 0' }}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <Loader2 className="animate-spin" size={48} color="var(--accent-color)" style={{ margin: '0 auto' }} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Verifying Identity...</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                Validating Aadhar and creating patient record
                            </p>
                        </div>
                    )}

                    {/* Step 3: Creating Wallet */}
                    {step === 3 && (
                        <div className="animate-fade-in" style={{ textAlign: 'center', padding: '2rem 0' }}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <Loader2 className="animate-spin" size={48} color="var(--accent-color)" style={{ margin: '0 auto' }} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Generating Blockchain Wallet...</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                                Creating cryptographic keys and registering on Hyperledger Fabric network
                            </p>
                            <div style={{
                                fontSize: '0.8rem',
                                color: 'var(--text-muted)',
                                fontFamily: 'monospace',
                                background: 'rgba(0,0,0,0.05)',
                                padding: '1rem',
                                borderRadius: '8px',
                                textAlign: 'left'
                            }}>
                                &gt; Connecting to Fabric network...<br />
                                &gt; Submitting transaction to peers...<br />
                                &gt; Waiting for consensus...<br />
                                &gt; <span style={{ color: '#10b981' }}>✓ Transaction committed</span>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Success */}
                    {step === 4 && (
                        <div className="animate-fade-in" style={{ textAlign: 'center', padding: '2rem 0' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: 'rgba(16, 185, 129, 0.2)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: '#10b981'
                            }}>
                                <CheckCircle size={40} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Registration Successful!</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                Your patient account has been created on the blockchain
                            </p>
                            <div style={{
                                background: 'rgba(16, 185, 129, 0.1)',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                borderRadius: '8px',
                                padding: '1rem',
                                marginBottom: '2rem'
                            }}>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                    Your Patient ID:
                                </p>
                                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-color)', fontFamily: 'monospace' }}>
                                    {registeredId}
                                </p>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                    Save this ID - you'll need it to login
                                </p>
                            </div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                Redirecting to login page...
                            </p>
                        </div>
                    )}

                    {step === 1 && (
                        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            Already registered? <Link to="/patient-login" style={{ color: 'var(--accent-color)', fontWeight: '600', textDecoration: 'none' }}>Login here</Link>
                        </div>
                    )}

                </Card>
            </div>
        </MainLayout>
    );
};

export default Register;
