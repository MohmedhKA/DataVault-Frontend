import { HeartPulse, Menu } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const MainLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            {/* Background Decor */}
            <div style={{
                position: 'fixed', top: '-10%', left: '-5%', width: '40%', height: '40%',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 60%)',
                zIndex: -1, filter: 'blur(100px)', opacity: 0.4
            }} />
            <div style={{
                position: 'fixed', bottom: '-10%', right: '-5%', width: '40%', height: '40%',
                background: 'radial-gradient(circle, rgba(52, 211, 153, 0.1) 0%, transparent 60%)',
                zIndex: -1, filter: 'blur(100px)', opacity: 0.4
            }} />

            {/* Navbar */}
            <nav style={{
                position: 'sticky', top: 0, zIndex: 50,
                borderBottom: '1px solid rgba(16, 185, 129, 0.1)',
                backdropFilter: 'blur(16px)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }}>
                <div className="container" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px'
                }}>
                    <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                            background: 'var(--confidence-gradient)',
                            padding: '10px', borderRadius: '12px',
                            boxShadow: '0 8px 15px rgba(16, 185, 129, 0.2)'
                        }}>
                            <HeartPulse color="white" size={24} />
                        </div>
                        <span className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
                            CareNexus
                        </span>
                    </Link>

                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        {/* Desktop Nav */}
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            {user ? (
                                <>
                                    <Link to="/dashboard" style={{
                                        color: isActive('/dashboard') ? 'var(--text-primary)' : 'var(--text-secondary)',
                                        textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s',
                                        borderBottom: isActive('/dashboard') ? '2px solid var(--accent-color)' : 'none'
                                    }}>Dashboard</Link>
                                    <Link to="/audit" style={{
                                        color: isActive('/audit') ? 'var(--text-primary)' : 'var(--text-secondary)',
                                        textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s',
                                        borderBottom: isActive('/audit') ? '2px solid var(--accent-color)' : 'none'
                                    }}>Audit Trail</Link>
                                </>
                            ) : (
                                <Link to="/" style={{
                                    color: isActive('/') ? 'var(--text-primary)' : 'var(--text-secondary)',
                                    textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s'
                                }}>Home</Link>
                            )}
                        </div>

                        {/* Actions */}
                        <div>
                            {user ? (
                                <Button variant="ghost" size="sm" onClick={handleLogout} style={{ border: '1px solid var(--glass-border)' }}>
                                    Logout
                                </Button>
                            ) : (
                                <Link to="/login">
                                    <Button size="sm" style={{ padding: '0.5rem 1.5rem' }}>Login</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container" style={{ paddingBottom: '4rem', paddingTop: '2rem', minHeight: 'calc(100vh - 80px)' }}>
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
