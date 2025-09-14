import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from './Button';

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirmar acción", 
  message = "¿Estás seguro de que deseas continuar?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "danger",
  loading = false
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'danger':
        return {
          icon: 'text-danger',
          iconBg: 'bg-danger-subtle',
          button: 'btn-danger'
        };
      case 'warning':
        return {
          icon: 'text-warning',
          iconBg: 'bg-warning-subtle',
          button: 'btn-warning'
        };
      default:
        return {
          icon: 'text-primary',
          iconBg: 'bg-primary-subtle',
          button: 'btn-primary'
        };
    }
  };

  const variantClasses = getVariantClasses();

  return (
    <>
      {/* Backdrop */}
      <div 
        className="modal-backdrop fade show" 
        onClick={onClose}
        style={{ zIndex: 1040 }}
      ></div>
      
      {/* Modal */}
      <div 
        className="modal fade show d-block" 
        tabIndex="-1" 
        style={{ zIndex: 1050 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0 pb-0">
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                disabled={loading}
              ></button>
            </div>
            
            <div className="modal-body text-center px-4 pb-4">
              {/* Icon */}
              <div className={`mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle ${variantClasses.iconBg}`} 
                   style={{ width: '64px', height: '64px' }}>
                <AlertTriangle className={variantClasses.icon} size={28} />
              </div>
              
              {/* Title */}
              <h4 className="modal-title mb-2">{title}</h4>
              
              {/* Message */}
              <p className="text-muted mb-4">{message}</p>
              
              {/* Actions */}
              <div className="d-flex gap-2 justify-content-center">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={loading}
                  className="px-4"
                >
                  {cancelText}
                </Button>
                <Button
                  variant={variant}
                  onClick={handleConfirm}
                  loading={loading}
                  className="px-4"
                >
                  {confirmText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
