import { useState, useEffect, useCallback } from 'react';
import { todoAPI } from '../services/api';
import toast from 'react-hot-toast';

export const useTodos = (initialFilters = {}) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  // Cargar todos
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await todoAPI.getAllTodos(filters);
      setTodos(response.data || []);
    } catch (err) {
      setError(err.message);
      toast.error(`Error al cargar las tareas: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Crear nueva tarea
  const createTodo = async (todoData) => {
    try {
      const response = await todoAPI.createTodo(todoData);
      setTodos(prevTodos => [...prevTodos, response.data]);
      toast.success('¡Tarea creada con éxito!');
      return response.data;
    } catch (err) {
      toast.error(`Error al crear la tarea: ${err.message}`);
      throw err;
    }
  };

  // Actualizar tarea
  const updateTodo = async (id, todoData) => {
    try {
      const response = await todoAPI.updateTodo(id, todoData);
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? response.data : todo
        )
      );
      toast.success('¡Tarea actualizada con éxito!');
      return response.data;
    } catch (err) {
      toast.error(`Error al actualizar la tarea: ${err.message}`);
      throw err;
    }
  };

  // Alternar estado de completado
  const toggleTodo = async (id) => {
    try {
      const response = await todoAPI.toggleTodo(id);
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? response.data : todo
        )
      );
      const message = response.data.completed ? '¡Tarea completada!' : 'Tarea marcada como pendiente';
      toast.success(message);
      return response.data;
    } catch (err) {
      toast.error(`Error al cambiar el estado: ${err.message}`);
      throw err;
    }
  };

  // Eliminar tarea
  const deleteTodo = async (id) => {
    try {
      console.log('Intentando eliminar tarea con ID:', id); // Debug log
      const response = await todoAPI.deleteTodo(id);
      console.log('Respuesta del servidor:', response); // Debug log
      setTodos(prevTodos => {
        const newTodos = prevTodos.filter(todo => todo.id !== id);
        console.log('Tareas antes:', prevTodos.length, 'Tareas después:', newTodos.length); // Debug log
        return newTodos;
      });
      toast.success('¡Tarea eliminada con éxito!');
    } catch (err) {
      console.error('Error al eliminar tarea:', err); // Debug log
      toast.error(`Error al eliminar la tarea: ${err.message}`);
      throw err;
    }
  };

  // Actualizar filtros
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Limpiar filtros
  const clearFilters = () => {
    setFilters({});
  };

  // Cargar todos al montar el componente o cambiar filtros
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    loading,
    error,
    filters,
    fetchTodos,
    createTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    updateFilters,
    clearFilters,
  };
};
