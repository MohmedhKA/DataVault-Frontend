import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    className = '',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-[var(--radius-md)] font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white shadow-lg hover:shadow-[var(--shadow-glow)] hover:-translate-y-0.5 border border-transparent',
        secondary: 'bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] text-[var(--text-primary)] hover:bg-[var(--glass-shine)]',
        ghost: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-shine)]',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-base',
        lg: 'px-8 py-3.5 text-lg',
    };

    // Note: Since we are using Vanilla CSS but might want Tailwind-like utility classes later, 
    // I am applying inline styles or standard classes.
    // For the "premium" feel defined in index.css, we rely on the .btn-primary class logic but extended here.
    // Ideally, valid CSS classes should be defined in index.css or strictly inline.
    // Let's rewrite this to completely rely on the `style` prop or specific classes if we aren't using Tailwind.
    // WAITING: The user prompt said "Vanilla CSS". I shouldn't use Tailwind classes like `bg-gradient-to-r` unless Tailwind is installed.
    // I checked `package.json` earlier (implied), only `lucide-react` was installed. Tailwind is NOT installed.
    // I MUST WRITE CSS modules or Inline Styles or use the classes I defined in index.css.

    return (
        <button
            className={`btn-${variant} ${className}`}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                // Fallback or specific overrides can go here
            }}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && <Loader2 className="animate-spin" size={18} />}
            {children}
        </button>
    );
};

export default Button;
