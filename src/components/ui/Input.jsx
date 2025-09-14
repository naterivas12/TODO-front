import React from 'react';

const Input = ({ 
  label,
  error,
  className = '',
  type = 'text',
  ...props 
}) => {
  const inputClasses = `form-control ${error ? 'is-invalid' : ''} ${className}`;

  return (
    <div className="mb-3">
      {label && (
        <label className="form-label">
          {label}
        </label>
      )}
      <input
        type={type}
        className={inputClasses}
        {...props}
      />
      {error && (
        <div className="invalid-feedback">{error}</div>
      )}
    </div>
  );
};

export default Input;
