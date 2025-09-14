import React from 'react';
import { TrendingUp, CheckCircle2, Clock, ListTodo } from 'lucide-react';

const TodoStats = ({ stats, loading }) => {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  if (loading) {
    return (
      <div className="row g-4 mb-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="col-md-3">
            <div className="card">
              <div className="card-body">
                <div className="placeholder-glow">
                  <span className="placeholder col-8 mb-2"></span>
                  <span className="placeholder col-6" style={{ height: '2rem' }}></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="row g-4 mb-4">
      {/* Total Tasks */}
      <div className="col-md-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="card-text text-muted small mb-1">Total de Tareas</p>
                <h3 className="card-title mb-0">{stats.total}</h3>
              </div>
              <div className="p-3 bg-primary bg-opacity-10 rounded-circle">
                <ListTodo className="text-primary" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="col-md-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="card-text text-muted small mb-1">Pendientes</p>
                <h3 className="card-title mb-0 text-warning">{stats.pending}</h3>
              </div>
              <div className="p-3 bg-warning bg-opacity-10 rounded-circle">
                <Clock className="text-warning" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Completed Tasks */}
      <div className="col-md-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="card-text text-muted small mb-1">Completadas</p>
                <h3 className="card-title mb-0 text-success">{stats.completed}</h3>
              </div>
              <div className="p-3 bg-success bg-opacity-10 rounded-circle">
                <CheckCircle2 className="text-success" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Rate */}
      <div className="col-md-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="card-text text-muted small mb-1">Progreso</p>
                <h3 className="card-title mb-0 text-info">{completionRate}%</h3>
              </div>
              <div className="p-3 bg-info bg-opacity-10 rounded-circle">
                <TrendingUp className="text-info" size={24} />
              </div>
            </div>
            <div className="mt-3">
              <div className="progress" style={{ height: '8px' }}>
                <div 
                  className="progress-bar bg-info"
                  role="progressbar"
                  style={{ width: `${completionRate}%` }}
                  aria-valuenow={completionRate}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoStats;
