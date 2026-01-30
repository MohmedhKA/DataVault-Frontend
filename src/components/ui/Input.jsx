import React from 'react';

const Input = ({ className = '', ...props }) => {
    return (
        <input
            className={`glass-panel ${className}`}
            style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: '#ffffff',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
                outline: 'none',
                fontSize: '1rem',
                transition: 'all 0.2s',
                ...props.style
            }}
            onFocus={(e) => {
                e.target.style.borderColor = 'var(--accent-color)';
                e.target.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)';
            }}
            onBlur={(e) => {
                e.target.style.borderColor = 'var(--glass-border)';
                e.target.style.boxShadow = 'none';
            }}
            {...props}
        />
    );
};

export default Input;
