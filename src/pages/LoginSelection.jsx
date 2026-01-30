import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Card from '../components/ui/Card';
import { User, Stethoscope, ArrowRight } from 'lucide-react';

const LoginSelection = () => {
    return (
        <MainLayout>
            <div style={{ maxWidth: '900px', margin: '4rem auto', textAlign: 'center' }}>
                <h1 className="text-gradient" style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Welcome to CareNexus
                </h1>
                <div style={{
                    fontSize: '1.1rem',
                    fontStyle: 'italic',
                    color: 'var(--accent-color)',
                    marginBottom: '1.5rem',
                    fontWeight: '500',
                    opacity: 0.8
                }}>
                    "A good doctor's comforting and reassuring words are sometimes more powerful than the medicines." –
                </div>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '4rem' }}>
                    Select your portal to continue securely.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>

                    {/* Patient Portal Link */}
                    <Link to="/login/patient" style={{ textDecoration: 'none' }}>
                        <Card className="glass-panel" style={{
                            padding: '3rem',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            border: '1px solid var(--glass-border)',
                            boxShadow: 'var(--shadow-glow-confidence)'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-12px)';
                                e.currentTarget.style.borderColor = 'var(--accent-color)';
                                e.currentTarget.style.background = '#ffffff';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(6, 78, 59, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = 'var(--glass-border)';
                                e.currentTarget.style.background = 'var(--glass-bg)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-glow-confidence)';
                            }}
                        >
                            <div style={{
                                width: '100px', height: '100px',
                                background: 'rgba(16, 185, 129, 0.12)',
                                borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: '2rem',
                                color: 'var(--accent-color)',
                                border: '2px solid rgba(16, 185, 129, 0.2)'
                            }}>
                                <User size={48} />
                            </div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>Patient Portal</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                                Boost your <strong>self-confidence</strong> and <strong>empowerment</strong> through total control over your health.
                            </p>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                color: 'var(--accent-color)', fontWeight: '600', fontSize: '1.1rem'
                            }}>
                                Access with Confidence <ArrowRight size={20} />
                            </div>
                        </Card>
                    </Link>

                    {/* Doctor Portal Link */}
                    <Link to="/login/doctor" style={{ textDecoration: 'none' }}>
                        <Card className="glass-panel" style={{
                            padding: '3rem',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            border: '1px solid var(--glass-border)',
                            boxShadow: 'var(--shadow-glow-strength)'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-12px)';
                                e.currentTarget.style.borderColor = 'var(--accent-secondary)';
                                e.currentTarget.style.background = '#ffffff';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(79, 70, 229, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = 'var(--glass-border)';
                                e.currentTarget.style.background = 'var(--glass-bg)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-glow-strength)';
                            }}
                        >
                            <div style={{
                                width: '100px', height: '100px',
                                background: 'rgba(79, 70, 229, 0.12)',
                                borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: '2rem',
                                color: 'var(--accent-secondary)',
                                border: '2px solid rgba(79, 70, 229, 0.2)'
                            }}>
                                <Stethoscope size={48} />
                            </div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>Doctor Portal</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontStyle: 'italic', fontSize: '0.95rem' }}>
                                "A good doctor's comforting and reassuring words are sometimes more powerful than the medicines."
                            </p>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                color: 'var(--accent-secondary)', fontWeight: '600', fontSize: '1.1rem'
                            }}>
                                Access with Confidence <ArrowRight size={20} />
                            </div>
                        </Card>
                    </Link>

                </div>
            </div>
        </MainLayout>
    );
};

export default LoginSelection;
