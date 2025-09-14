import React from 'react';
import { X } from 'lucide-react';
import Button from './ui/Button';
import Select from './ui/Select';
import Input from './ui/Input';

const TodoFilters = ({ filters, onFiltersChange, onClearFilters, todosCount }) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="row g-3 align-items-end">
          {/* Search */}
          <div className="col-md-4">
            <Input
              placeholder="Buscar tareas..."
              value={filters.search}
              onChange={(e) => onFiltersChange({ search: e.target.value })}
            />
          </div>

          {/* Status Filter */}
          <div className="col-md-3">
            <Select
              value={filters.status}
              onChange={(e) => onFiltersChange({ status: e.target.value })}
              options={[
                { value: 'all', label: 'Todas' },
                { value: 'pending', label: 'Pendientes' },
                { value: 'completed', label: 'Completadas' }
              ]}
            />
          </div>

          {/* Priority Filter */}
          <div className="col-md-3">
            <Select
              value={filters.priority}
              onChange={(e) => onFiltersChange({ priority: e.target.value })}
              options={[
                { value: 'all', label: 'Todas las prioridades' },
                { value: 'high', label: 'Alta prioridad' },
                { value: 'medium', label: 'Media prioridad' },
                { value: 'low', label: 'Baja prioridad' }
              ]}
            />
          </div>

          {/* Clear Button */}
          <div className="col-md-2">
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="w-100"
            >
              <X className="me-1" size={16} />
              Limpiar
            </Button>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-3 pt-3 border-top">
          <small className="text-muted">
            Mostrando {todosCount} {todosCount === 1 ? 'tarea' : 'tareas'}
          </small>
        </div>
      </div>
    </div>
  );
};

export default TodoFilters;
