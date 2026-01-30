import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/ui/Button';

const NotFound = () => {
    return (
        <MainLayout>
            <div style={{
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}>
                <h1 className="text-gradient" style={{ fontSize: '8rem', fontWeight: '900', lineHeight: 1 }}>404</h1>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page Not Found</h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', marginBottom: '2rem' }}>
                    The block you use looking for doesn't exist on this chain. It might have been pruned or never created.
                </p>
                <Link to="/">
                    <Button size="lg">Return to Safety</Button>
                </Link>
            </div>
        </MainLayout>
    );
};

export default NotFound;
