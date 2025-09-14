import { useState, useEffect, useCallback } from 'react';
import { todoAPI } from '../services/api';
import toast from 'react-hot-toast';

export const useStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0,
    byPriority: {
      high: 0,
      medium: 0,
      low: 0
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await todoAPI.getStats();
      console.log('Stats response:', response); // Debug log
      setStats(response.data || response);
    } catch (err) {
      console.error('Error fetching stats:', err); // Debug log
      setError(err.message);
      toast.error(`Error al cargar las estadísticas: ${err.message}`);
      
      // Fallback: try to calculate stats from todos list
      try {
        const todosResponse = await todoAPI.getAllTodos();
        const todos = todosResponse.data || todosResponse;
        const calculatedStats = {
          total: todos.length,
          completed: todos.filter(todo => todo.completed).length,
          pending: todos.filter(todo => !todo.completed).length,
          completionRate: todos.length > 0 ? Math.round((todos.filter(todo => todo.completed).length / todos.length) * 100) : 0,
          byPriority: {
            high: todos.filter(todo => todo.priority === 'high').length,
            medium: todos.filter(todo => todo.priority === 'medium').length,
            low: todos.filter(todo => todo.priority === 'low').length
          }
        };
        console.log('Calculated stats from todos:', calculatedStats); // Debug log
        setStats(calculatedStats);
      } catch (fallbackErr) {
        console.error('Fallback stats calculation failed:', fallbackErr);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    fetchStats,
    refreshStats: fetchStats, // Alias para refrescar estadísticas
  };
};
