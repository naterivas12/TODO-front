import React from 'react';

const LoadingSpinner = ({ size = 'medium', className = '' }) => {
  const sizes = {
    small: 'spinner-border-sm',
    medium: '',
    large: 'spinner-border-lg'
  };

  return (
    <div className={`d-flex justify-content-center align-items-center ${className}`}>
      <div className={`spinner-border text-primary ${sizes[size]}`} role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
