import React, { useState } from 'react';
import { Plus, ListTodo, CheckCircle2 } from 'lucide-react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import TodoFilters from './TodoFilters';
import Modal from './ui/Modal';
import Button from './ui/Button';
import LoadingSpinner from './ui/LoadingSpinner';
import { useTodos } from '../hooks/useTodos';

const TodoList = ({ onStatsChange }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    todos,
    loading,
    error,
    filters,
    createTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    updateFilters,
    clearFilters
  } = useTodos();

  // Filter todos based on search
  const filteredTodos = todos.filter(todo => {
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      return (
        todo.title.toLowerCase().includes(searchTerm) ||
        todo.description.toLowerCase().includes(searchTerm)
      );
    }
    return true;
  });

  const handleCreateTodo = async (todoData) => {
    setIsSubmitting(true);
    try {
      await createTodo(todoData);
      setShowCreateModal(false);
      // Actualizar estadísticas después de crear una tarea
      if (onStatsChange) {
        onStatsChange();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTodo = async (todoData) => {
    if (!editingTodo) return;
    
    setIsSubmitting(true);
    try {
      await updateTodo(editingTodo.id, todoData);
      setEditingTodo(null);
      // Actualizar estadísticas después de actualizar una tarea
      if (onStatsChange) {
        onStatsChange();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
  };

  const handleToggleTodo = async (id) => {
    await toggleTodo(id);
    // Actualizar estadísticas después de cambiar el estado de una tarea
    if (onStatsChange) {
      onStatsChange();
    }
  };

  const handleDeleteTodo = async (id) => {
    console.log('TodoList: handleDeleteTodo llamado con ID:', id);
    console.log('TodoList: función deleteTodo disponible:', typeof deleteTodo);
    try {
      await deleteTodo(id);
      console.log('TodoList: deleteTodo completado exitosamente');
      // Actualizar estadísticas después de eliminar una tarea
      if (onStatsChange) {
        onStatsChange();
      }
    } catch (error) {
      console.error('TodoList: Error en handleDeleteTodo:', error);
    }
  };

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <svg className="me-2" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <strong>Error:</strong> {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <ListTodo className="me-3 text-primary" size={32} />
            <div>
              <h1 className="h2 mb-1">Mi Lista de Tareas</h1>
              <p className="text-muted mb-0">Organiza y gestiona tus tareas diarias</p>
            </div>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="d-flex align-items-center"
          >
            <Plus className="me-2" size={16} />
            <span>Nueva Tarea</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <TodoFilters
        filters={filters}
        onFiltersChange={updateFilters}
        onClearFilters={clearFilters}
        todosCount={filteredTodos.length}
      />

      {/* Loading State */}
      {loading && (
        <div className="text-center py-5">
          <LoadingSpinner size="large" />
        </div>
      )}

      {/* Todo List */}
      {!loading && (
        <div className="row g-3">
          {filteredTodos.length === 0 ? (
            <div className="col-12">
              <div className="text-center py-5">
                <CheckCircle2 className="text-muted mb-3" size={64} />
                <h3 className="h4 mb-2">
                  {todos.length === 0 ? 'No tienes tareas aún' : 'No se encontraron tareas'}
                </h3>
                <p className="text-muted mb-4">
                  {todos.length === 0 
                    ? 'Crea tu primera tarea para comenzar a organizarte'
                    : 'Intenta ajustar los filtros para encontrar lo que buscas'
                  }
                </p>
                {todos.length === 0 && (
                  <Button onClick={() => setShowCreateModal(true)}>
                    <Plus className="me-2" size={16} />
                    Crear primera tarea
                  </Button>
                )}
              </div>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div key={todo.id} className="col-12">
                <TodoItem
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onEdit={handleEditTodo}
                  onDelete={handleDeleteTodo}
                />
              </div>
            ))
          )}
        </div>
      )}

      {/* Create Todo Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Crear Nueva Tarea"
        size="medium"
      >
        <TodoForm
          onSubmit={handleCreateTodo}
          onCancel={() => setShowCreateModal(false)}
          loading={isSubmitting}
        />
      </Modal>

      {/* Edit Todo Modal */}
      <Modal
        isOpen={!!editingTodo}
        onClose={() => setEditingTodo(null)}
        title="Editar Tarea"
        size="medium"
      >
        <TodoForm
          todo={editingTodo}
          onSubmit={handleUpdateTodo}
          onCancel={() => setEditingTodo(null)}
          loading={isSubmitting}
        />
      </Modal>
    </div>
  );
};

export default TodoList;
