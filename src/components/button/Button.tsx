import React from 'react';
import './button.scss';

interface ButtonProps {
    className?: string; // Optional className for the button
    onClick?: () => void; // Optional onClick handler
    children: React.ReactNode; // Children to be rendered inside the button
}

const Button: React.FC<ButtonProps> = ({ className = '', onClick, children }) => {
    return (
        <button
            className={`btn ${className}`}
            onClick={onClick ? () => onClick() : undefined}
        >
            {children}
        </button>
    );
};

export const OutlineButton: React.FC<ButtonProps> = ({ className = '', onClick, children }) => {
    return (
        <Button
            className={`btn-outline ${className}`}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

export default Button;
