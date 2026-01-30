import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/ui/Button';
import { Shield, Fingerprint, Lock, ArrowRight, Activity, HeartPulse } from 'lucide-react';

const Landing = () => {
    return (
        <MainLayout>
            <div className="animate-fade-in" style={{ textAlign: 'center', padding: '4rem 0' }}>

                {/* Hero Section */}
                <div style={{ position: 'relative', marginBottom: '6rem' }}>
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: '600px', height: '600px',
                        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
                        filter: 'blur(100px)', zIndex: -1
                    }} />

                    <div style={{ display: 'inline-flex', padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '999px', marginBottom: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                        <span className="text-gradient" style={{ fontWeight: '600', fontSize: '0.9rem' }}>✨ Next-Gen Blockchain Healthcare</span>
                    </div>

                    <h1 style={{
                        fontSize: '4.5rem',
                        fontWeight: '800',
                        lineHeight: '1.1',
                        marginBottom: '1rem',
                        letterSpacing: '-0.03em'
                    }}>
                        Your Health Data,<br />
                        <span className="text-gradient" style={{
                            background: 'linear-gradient(to right, #059669, #10b981, #34d399)',
                            webkitBackgroundClip: 'text',
                            webkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            color: 'transparent'
                        }}>Secured Forever.</span>
                    </h1>

                    <div style={{
                        fontSize: '1.2rem',
                        fontStyle: 'italic',
                        color: 'var(--accent-color)',
                        marginBottom: '2rem',
                        fontWeight: '500',
                        opacity: 0.9,
                        letterSpacing: '0.02em'
                    }}>
                        "A good doctor's comforting and reassuring words are sometimes more powerful than the medicines." –
                    </div>

                    <p style={{ fontSize: '1.35rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
                        Take complete control over your medical records. Grant temporary access to doctors instantly and revoke it just as fast.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link to="/login">
                            <Button size="lg" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                                Get Started <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                            </Button>
                        </Link>
                        <Button variant="ghost" size="lg" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}>
                            Learn More
                        </Button>
                    </div>
                </div>

                {/* Features Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    textAlign: 'left'
                }}>
                    {[
                        { icon: Shield, title: "Unbreakable Security", desc: "Powered by Hyperledger Fabric, ensuring your data is tampered-proof.", color: "#8b5cf6" },
                        { icon: Fingerprint, title: "Biometric Access", desc: "Login securely using advanced fingerprint recognition without passwords.", color: "#ec4899" },
                        { icon: Lock, title: "Granular Control", desc: "Grant access for exactly 1 hour or 1 day. You decide who sees what.", color: "#10b981" },
                        { icon: Activity, title: "Audit Trails", desc: "Complete transparency. See exactly who accessed your data and when.", color: "#f59e0b" },
                    ].map((feature, idx) => (
                        <div key={idx} className="glass-panel" style={{
                            padding: '2rem',
                            transition: 'transform 0.3s ease',
                            cursor: 'default'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{
                                background: `rgba(${parseInt(feature.color.slice(1, 3), 16)}, ${parseInt(feature.color.slice(3, 5), 16)}, ${parseInt(feature.color.slice(5, 7), 16)}, 0.1)`,
                                width: 'fit-content',
                                padding: '1rem',
                                borderRadius: '14px',
                                marginBottom: '1.5rem',
                                color: feature.color
                            }}>
                                <feature.icon size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{feature.title}</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </MainLayout>
    );
};

export default Landing;
