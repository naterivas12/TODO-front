import React from 'react';

const Select = ({ 
  label,
  error,
  options = [],
  className = '',
  placeholder = 'Selecciona una opción...',
  ...props 
}) => {
  const selectClasses = `form-select ${error ? 'is-invalid' : ''} ${className}`;

  return (
    <div className="mb-3">
      {label && (
        <label className="form-label">
          {label}
        </label>
      )}
      <select className={selectClasses} {...props}>
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <div className="invalid-feedback">{error}</div>
      )}
    </div>
  );
};

export default Select;
