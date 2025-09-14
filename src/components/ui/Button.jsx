import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  loading = false,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    success: 'btn-success',
    outline: 'btn-outline-primary',
    ghost: 'btn-outline-light text-dark'
  };
  
  const sizes = {
    small: 'btn-sm',
    medium: '',
    large: 'btn-lg'
  };
  
  const classes = `btn ${variants[variant]} ${sizes[size]} d-inline-flex align-items-center ${className}`;
  
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <div className="spinner-border spinner-border-sm me-2" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      )}
      {children}
    </button>
  );
};

export default Button;
