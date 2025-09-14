# Todo List Frontend

Frontend en React para la aplicación de lista de tareas con comunicación completa con la API backend.

## Características

- Interfaz moderna y responsive con React + Vite
- Diseño elegante con Tailwind CSS
- Completamente responsive para móviles y desktop
- Comunicación en tiempo real con API REST
- CRUD completo de tareas
- Filtros avanzados por estado, prioridad y búsqueda
- Dashboard de estadísticas
- Notificaciones toast para feedback del usuario
- Estados de carga y manejo de errores
- Componentes reutilizables y hooks personalizados

## Requisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Backend de la API ejecutándose en `http://localhost:3000`

## Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm run dev
```

3. Abre tu navegador en `http://localhost:5173`

## Estructura del Proyecto

```
src/
├── components/           # Componentes React
│   ├── ui/              # Componentes UI reutilizables
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   ├── Modal.jsx
│   │   └── LoadingSpinner.jsx
│   ├── TodoItem.jsx     # Componente de tarea individual
│   ├── TodoForm.jsx     # Formulario para crear/editar tareas
│   ├── TodoList.jsx     # Lista principal de tareas
│   ├── TodoFilters.jsx  # Filtros y búsqueda
│   └── StatsCard.jsx    # Dashboard de estadísticas
├── hooks/               # Hooks personalizados
│   ├── useTodos.js      # Hook para operaciones CRUD
│   └── useStats.js      # Hook para estadísticas
├── services/            # Servicios de API
│   └── api.js           # Configuración de Axios y endpoints
├── context/             # Context API
│   └── TodoContext.jsx  # Estado global de la aplicación
├── App.jsx              # Componente principal
└── App.css              # Estilos globales
```

## Funcionalidades

### Gestión de Tareas
- Crear tareas con título, descripción y prioridad
- Editar tareas existentes
- Marcar como completada/pendiente con un click
- Eliminar tareas con confirmación
- Validación de formularios en tiempo real

### Filtros y Búsqueda
- Búsqueda por texto en título y descripción
- Filtrar por estado (todas, pendientes, completadas)
- Filtrar por prioridad (alta, media, baja)
- Limpiar filtros con un botón

### Dashboard
- Total de tareas
- Tareas completadas
- Tareas pendientes
- Porcentaje de completado

### UX/UI
- Diseño moderno con Tailwind CSS
- Responsive design para todos los dispositivos
- Notificaciones toast para feedback
- Estados de carga durante operaciones
- Manejo de errores con mensajes claros

## Tecnologías Utilizadas

- React 19 - Framework de UI
- Vite - Build tool y dev server
- Tailwind CSS - Framework de CSS
- Axios - Cliente HTTP para API
- Lucide React - Iconos
- React Hot Toast - Notificaciones
- Context API - Manejo de estado global

## Comunicación con la API

El frontend se comunica con el backend a través de:

- GET `/api/todos` - Obtener todas las tareas
- POST `/api/todos` - Crear nueva tarea
- PUT `/api/todos/:id` - Actualizar tarea
- PATCH `/api/todos/:id/toggle` - Alternar estado
- DELETE `/api/todos/:id` - Eliminar tarea
- GET `/api/todos/stats/summary` - Obtener estadísticas

## Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## Personalización

### Colores
Los colores se pueden personalizar en `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      }
    }
  }
}
```

### Configuración de API
La URL base de la API se puede cambiar en `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

## Estado de la Aplicación

El estado se maneja con:
- Context API para estado global
- Hooks personalizados para lógica de negocio
- Estado local para UI específica

## Responsive Design

La aplicación está optimizada para:
- Móviles (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## Manejo de Errores

- Errores de red - Detecta cuando el backend no está disponible
- Errores de validación - Muestra errores de formulario
- Timeouts - Maneja timeouts de peticiones
- Estados de error - UI específica para errores

## Próximas Mejoras

- [ ] Drag & drop para reordenar tareas
- [ ] Modo oscuro
- [ ] Offline support con Service Workers
- [ ] Categorías/etiquetas para tareas
- [ ] Fechas de vencimiento
- [ ] Recordatorios
- [ ] Export/import de tareas
- [ ] Tests unitarios y de integración

## Licencia

Este proyecto está bajo la licencia MIT.
