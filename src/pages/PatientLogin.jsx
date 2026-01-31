import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { User, ArrowLeft } from 'lucide-react';

const PatientLogin = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [patientId, setPatientId] = useState(''); // Changed from 'id' to 'patientId'
    const [password, setPassword] = useState(''); // Changed from 'pwd' to 'password'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        console.log('🔐 Attempting login with:', { patientId, passwordLength: password.length });

        try {
            const res = await login(patientId, password, 'patient');
            console.log('✅ Login response:', res);
            
            if (res.success) {
                navigate('/dashboard');
            } else {
                setError(res.error || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            console.error('❌ Login error:', err);
            setError(err.message || 'Network error. Please ensure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div style={{ maxWidth: '450px', margin: '4rem auto', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', background: 'rgba(16, 185, 129, 0.25)', filter: 'blur(80px)', borderRadius: '50%', zIndex: -1 }}></div>

                <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '1.5rem' }}>
                    <ArrowLeft size={18} /> Back to Selection
                </Link>

                <Card className="animate-fade-in" style={{ padding: '3rem', borderTop: '4px solid var(--accent-color)', boxShadow: 'var(--shadow-glow-confidence)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{
                            width: '64px', height: '64px',
                            background: 'rgba(16, 185, 129, 0.1)',
                            borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 1rem',
                            color: 'var(--accent-color)',
                            border: '1px solid rgba(16, 185, 129, 0.3)'
                        }}>
                            <User size={32} />
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Patient Portal</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Step into a state of <strong>confidence</strong> and <strong>empowerment</strong>.</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500' }}>Patient ID</label>
                            <Input
                                value={patientId}
                                onChange={(e) => setPatientId(e.target.value)}
                                placeholder="e.g. P1234"
                                style={{ padding: '1rem', fontSize: '1.1rem' }}
                                required
                            />
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                Use the Patient ID from your registration
                            </p>
                        </div>
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500' }}>Password</label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                style={{ padding: '1rem', fontSize: '1.1rem' }}
                                required
                            />
                        </div>

                        {error && (
                            <div style={{ 
                                color: '#ef4444', 
                                marginBottom: '1.5rem', 
                                padding: '0.75rem', 
                                background: 'rgba(239, 68, 68, 0.1)', 
                                borderRadius: '8px', 
                                fontSize: '0.9rem', 
                                textAlign: 'center',
                                border: '1px solid rgba(239, 68, 68, 0.2)'
                            }}>
                                ❌ {error}
                            </div>
                        )}

                        <Button 
                            type="submit" 
                            isLoading={loading} 
                            disabled={loading}
                            style={{ 
                                width: '100%', 
                                padding: '1rem', 
                                fontSize: '1.1rem', 
                                background: 'var(--confidence-gradient)' 
                            }}
                        >
                            {loading ? 'Logging in...' : 'Enter with Confidence'}
                        </Button>
                    </form>

                    <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        New User? <Link to="/register" style={{ color: 'var(--accent-color)', fontWeight: '600', textDecoration: 'none' }}>Create Account</Link>
                    </div>
                </Card>
            </div>
        </MainLayout>
    );
};

export default PatientLogin;
