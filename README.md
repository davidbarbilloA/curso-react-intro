# Kanban Board – Gestor de tareas con React

Tablero Kanban para organizar tareas en tres columnas, con arrastrar y soltar, búsqueda y contador de progreso. Parte del repositorio base del [Curso de Introducción a React.js de Platzi](https://platzi.com/reactjs) y lo extiende. Las tareas se guardan en `localStorage`, sin backend.

## Tech stack

| Capa | Tecnologías |
|------|-------------|
| **Frontend** | React 18, JavaScript, Create React App (`react-scripts` 5) |
| **Arrastrar y soltar** | dnd-kit (`core`, `sortable`, `modifiers`, `utilities`) |
| **Iconos** | React Icons |
| **Persistencia** | `localStorage` del navegador |

## Estructura del proyecto

```text
curso-react-intro/
├── public/                  # HTML base, manifest y robots
├── src/
│   ├── App.js               # Estado de las tareas y lógica de arrastrar y soltar
│   ├── CreateTodoButton/    # Botón y formulario para crear tareas
│   ├── KanbanColumn/        # Columna del tablero
│   ├── TodoCounter/         # Total, completadas y pendientes
│   ├── TodoItem/            # Tarjeta de una tarea
│   ├── TodoList/            # Lista de tareas de una columna
│   ├── TodoSearch/          # Búsqueda por texto
│   └── hooks/
│       └── useLocalStorage.js # Estado sincronizado con localStorage
├── package.json
└── README.md
```

## Funcionalidades

- Tablero con tres columnas: **Creado**, **En progreso** y **Finalizado**
- Crear y eliminar tareas
- **Arrastrar y soltar** entre columnas y dentro de una misma columna, con mouse o teclado
- Cambio rápido de estado en ciclo: `created` → `ongoing` → `completed` → `created`
- **Búsqueda** por texto
- **Contador** de tareas totales, completadas y pendientes
- **Persistencia** en `localStorage` (clave `TODOS_V1`)

## Modelo de datos

Cada tarea se guarda como un objeto dentro de un arreglo en `localStorage`:

```json
{
  "id": "1730900000000",
  "text": "Escribir el README",
  "status": "created"
}
```

Valores de `status`: `created`, `ongoing`, `completed`.

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/davidbarbilloA/curso-react-intro.git
cd curso-react-intro
```

### 2. Instalar dependencias

**Requisitos:** Node.js 16+

```bash
npm install
```

### 3. Servidor de desarrollo (puerto 3000)

```bash
npm start
```

App disponible en: `http://localhost:3000`

### Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Servidor de desarrollo |
| `npm run build` | Build de producción en `build/` |
| `npm run eject` | Expone la configuración de Create React App (irreversible) |

## Flujo típico de uso

1. Crea una tarea con el botón **+**; empieza en la columna **Creado**.
2. Arrástrala a **En progreso** cuando la empieces y a **Finalizado** cuando termines.
3. Usa la búsqueda para filtrar el tablero y el contador para ver tu avance.

## Build de producción

```bash
npm run build
```

## Autor

- [@davidbarbilloA](https://github.com/davidbarbilloA)
