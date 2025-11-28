import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
    const hoverEffect = hover ? 'hover:shadow-xl transition-shadow duration-300' : '';

    return (
        <div className={`bg-white rounded-lg shadow-md overflow-hidden ${hoverEffect} ${className}`}>
            {children}
        </div>
    );
};

export default Card;
