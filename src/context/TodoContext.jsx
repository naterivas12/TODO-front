import React, { createContext, useContext, useReducer } from 'react';

// Estado inicial
const initialState = {
  todos: [],
  loading: false,
  error: null,
  filters: {
    status: '',
    priority: '',
    search: ''
  },
  stats: {
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0,
    byPriority: {
      high: 0,
      medium: 0,
      low: 0
    }
  }
};

// Tipos de acciones
const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_TODOS: 'SET_TODOS',
  ADD_TODO: 'ADD_TODO',
  UPDATE_TODO: 'UPDATE_TODO',
  DELETE_TODO: 'DELETE_TODO',
  SET_FILTERS: 'SET_FILTERS',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
  SET_STATS: 'SET_STATS'
};

// Reducer
const todoReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case actionTypes.SET_TODOS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
        error: null
      };

    case actionTypes.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };

    case actionTypes.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo
        )
      };

    case actionTypes.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    case actionTypes.SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };

    case actionTypes.CLEAR_FILTERS:
      return {
        ...state,
        filters: initialState.filters
      };

    case actionTypes.SET_STATS:
      return {
        ...state,
        stats: action.payload
      };

    default:
      return state;
  }
};

// Crear contexto
const TodoContext = createContext();

// Provider del contexto
export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await todoAPI.getStats();
      dispatch({ type: actionTypes.SET_STATS, payload: response.data });
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Fallback: calculate stats from current todos
      const calculatedStats = {
        total: state.todos.length,
        completed: state.todos.filter(todo => todo.completed).length,
        pending: state.todos.filter(todo => !todo.completed).length,
        completionRate: state.todos.length > 0 ? Math.round((state.todos.filter(todo => todo.completed).length / state.todos.length) * 100) : 0,
        byPriority: {
          high: state.todos.filter(todo => todo.priority === 'high').length,
          medium: state.todos.filter(todo => todo.priority === 'medium').length,
          low: state.todos.filter(todo => todo.priority === 'low').length
        }
      };
      dispatch({ type: actionTypes.SET_STATS, payload: calculatedStats });
    }
  };

  // Actions
  const actions = {
    setLoading: (loading) => {
      dispatch({ type: actionTypes.SET_LOADING, payload: loading });
    },

    setError: (error) => {
      dispatch({ type: actionTypes.SET_ERROR, payload: error });
    },

    setTodos: (todos) => {
      dispatch({ type: actionTypes.SET_TODOS, payload: todos });
    },

    addTodo: (todo) => {
      dispatch({ type: actionTypes.ADD_TODO, payload: todo });
    },

    updateTodo: (todo) => {
      dispatch({ type: actionTypes.UPDATE_TODO, payload: todo });
    },

    deleteTodo: (todoId) => {
      dispatch({ type: actionTypes.DELETE_TODO, payload: todoId });
    },

    setFilters: (filters) => {
      dispatch({ type: actionTypes.SET_FILTERS, payload: filters });
    },

    clearFilters: () => {
      dispatch({ type: actionTypes.CLEAR_FILTERS });
    },

    setStats: (stats) => {
      dispatch({ type: actionTypes.SET_STATS, payload: stats });
    }
  };

  const value = {
    ...state,
    ...actions
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext debe ser usado dentro de un TodoProvider');
  }
  return context;
};

export default TodoContext;
