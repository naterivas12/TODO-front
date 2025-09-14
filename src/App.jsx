import React, { useEffect, useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import TodoList from './components/TodoList';
import TodoStats from './components/StatsCard';
import { useStats } from './hooks/useStats';
import { todoAPI } from './services/api';
import './App.css';

function App() {
  const { stats, loading: statsLoading, refreshStats } = useStats();
  const refreshStatsRef = useRef(refreshStats);

  // Actualizar la referencia cuando cambie refreshStats
  useEffect(() => {
    refreshStatsRef.current = refreshStats;
  }, [refreshStats]);

  // Test backend connection on app load
  useEffect(() => {
    const testBackendConnection = async () => {
      try {
        console.log('🔍 Probando conexión con el backend...');
        await todoAPI.healthCheck();
        console.log('✅ Backend conectado correctamente');
      } catch (error) {
        console.error('❌ Error conectando con el backend:', error);
        console.log('💡 Asegúrate de que el backend esté corriendo en http://localhost:3000');
      }
    };
    
    testBackendConnection();
  }, []);

  // Función para refrescar estadísticas que se pasará a TodoList
  const handleStatsRefresh = () => {
    refreshStatsRef.current();
  };

  return (
    <div className="min-vh-100">
      <div className="container py-4">
        {/* Statistics Dashboard */}
        <TodoStats stats={stats} loading={statsLoading} />
        
        {/* Main Todo List */}
        <TodoList onStatsChange={handleStatsRefresh} />
      </div>
      
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default App
