import React from 'react';
import { X } from 'lucide-react';
import Button from './Button';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'medium',
  showCloseButton = true 
}) => {
  if (!isOpen) return null;

  const sizes = {
    small: 'modal-sm',
    medium: '',
    large: 'modal-lg',
    xlarge: 'modal-xl'
  };

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className={`modal-dialog ${sizes[size]}`}>
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            {title && (
              <h5 className="modal-title">{title}</h5>
            )}
            {showCloseButton && (
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Cerrar"
              ></button>
            )}
          </div>

          {/* Content */}
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
