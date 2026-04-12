import React from 'react';

const Card = ({ children, className = '', animate = true, style = {} }) => {
  return (
    <div 
      className={`glass-card ${animate ? 'animate-fade-in' : ''} ${className}`}
      style={{
        padding: 'clamp(24px, 4vw, 40px)',
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default Card;
