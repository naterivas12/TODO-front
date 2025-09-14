import React, { useState } from 'react';
import { Edit2, Trash2, Check, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import Button from './ui/Button';
import ConfirmModal from './ui/ConfirmModal';

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      await onToggle(todo.id);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    console.log('TodoItem: Iniciando eliminación para tarea:', todo.id, todo.title);
    setIsDeleting(true);
    try {
      await onDelete(todo.id);
      console.log('TodoItem: Eliminación completada para tarea:', todo.id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('TodoItem: Error en eliminación:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-danger bg-danger-subtle border-danger';
      case 'medium':
        return 'text-warning bg-warning-subtle border-warning';
      case 'low':
        return 'text-success bg-success-subtle border-success';
      default:
        return 'text-secondary bg-secondary-subtle border-secondary';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <AlertCircle size={14} />;
      case 'medium':
        return <Clock size={14} />;
      case 'low':
        return <CheckCircle2 size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  return (
    <div className={`card ${todo.completed ? 'opacity-75' : ''}`}>
      <div className="card-body">
        <div className="d-flex align-items-start">
          {/* Checkbox */}
          <div className="form-check me-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggle}
              disabled={isToggling}
              id={`todo-${todo.id}`}
            />
          </div>

          {/* Content */}
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start">
              <div className="flex-grow-1">
                <h5 className={`card-title mb-1 ${
                  todo.completed ? 'text-decoration-line-through text-muted' : ''
                }`}>
                  {todo.title}
                </h5>
                {todo.description && (
                  <p className={`card-text small ${
                    todo.completed ? 'text-decoration-line-through text-muted' : 'text-secondary'
                  }`}>
                    {todo.description}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="d-flex gap-1 ms-3">
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => onEdit(todo)}
                  className="p-1"
                >
                  <Edit2 size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="small"
                  onClick={handleDeleteClick}
                  loading={isDeleting}
                  className="p-1 text-danger"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>

            {/* Meta information */}
            <div className="d-flex justify-content-between align-items-center mt-2">
              <div>
                {/* Priority badge */}
                <span className={`badge border ${getPriorityColor(todo.priority)}`}>
                  {getPriorityIcon(todo.priority)}
                  <span className="ms-1">
                    {todo.priority === 'high' ? 'Alta' : 
                     todo.priority === 'medium' ? 'Media' : 
                     todo.priority === 'low' ? 'Baja' : todo.priority}
                  </span>
                </span>
              </div>

              {/* Timestamps */}
              <small className="text-muted">
                {todo.updatedAt !== todo.createdAt ? (
                  <span>Actualizada: {new Date(todo.updatedAt).toLocaleDateString()}</span>
                ) : (
                  <span>Creada: {new Date(todo.createdAt).toLocaleDateString()}</span>
                )}
              </small>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de confirmación para eliminar */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Tarea"
        message={`¿Estás seguro de que deseas eliminar la tarea "${todo.title}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        variant="danger"
        loading={isDeleting}
      />
    </div>
  );
};

export default TodoItem;
