import { TodoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButton';
import React from 'react';
import './App.css';

// dnd-kit imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  useDroppable,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

const defaultTodos = [
  { id: '1', text: 'Cortar cebolla', status: 'completed' },
  { id: '2', text: 'Tomar curso de intro en React.js', status: 'created' },
  { id: '3', text: 'Llorar con la llorona', status: 'ongoing' },
  { id: '4', text: 'LALALAALA', status: 'completed' }
];

function App() {
  const [todos, setTodos] = React.useState(defaultTodos);
  const [searchValue, setSearchValue] = React.useState('');
  const [activeId, setActiveId] = React.useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(searchValue.toLowerCase())
  );

  const createdTodos = filteredTodos.filter(todo => todo.status === 'created');
  const ongoingTodos = filteredTodos.filter(todo => todo.status === 'ongoing');
  const completedTodos = filteredTodos.filter(todo => todo.status === 'completed');

  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const findContainer = (id) => {
    if (['created', 'ongoing', 'completed'].includes(id)) return id;
    const todo = todos.find(t => t.id === id);
    return todo ? todo.status : null;
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setTodos((prev) => {
      const activeIndex = prev.findIndex(t => t.id === active.id);
      const updatedTodos = [...prev];
      updatedTodos[activeIndex] = { ...updatedTodos[activeIndex], status: overContainer };
      return updatedTodos;
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    if (active.id !== over.id) {
      const activeContainer = findContainer(active.id);
      const overContainer = findContainer(over.id);

      if (activeContainer === overContainer) {
        setTodos((items) => {
          const oldIndex = items.findIndex(t => t.id === active.id);
          const newIndex = items.findIndex(t => t.id === over.id);

          if (newIndex === -1) return items;
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }
  };

  const activeTodo = activeId ? todos.find(t => t.id === activeId) : null;

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  return (
    <div className="App-container">
      <header className="App-header">
        <h1 className="App-title">Kanban Board</h1>
        <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
        <TodoCounter total={todos.length} completed={todos.filter(t => t.status === 'completed').length} />
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
        <main className="App-board">
          <KanbanColumn
            id="created"
            title="Creado"
            todos={createdTodos}
            onDelete={deleteTodo}
          />
          <KanbanColumn
            id="ongoing"
            title="En progreso"
            todos={ongoingTodos}
            onDelete={deleteTodo}
          />
          <KanbanColumn
            id="completed"
            title="Finalizado"
            todos={completedTodos}
            onDelete={deleteTodo}
          />
        </main>

        <DragOverlay dropAnimation={dropAnimation}>
          {activeTodo ? (
            <TodoItem
              text={activeTodo.text}
              completed={activeTodo.status === 'completed'}
              isOverlay
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      <CreateTodoButton />
    </div>
  );
}

function KanbanColumn({ id, title, todos, onDelete }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <section className="Kanban-column">
      <div className="Kanban-column-header">
        <h2>{title}</h2>
        <span className="count">{todos.length}</span>
      </div>
      <SortableContext
        id={id}
        items={todos.map(t => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="Kanban-column-content">
          <TodoList>
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                completed={todo.status === 'completed'}
                onDelete={() => onDelete(todo.id)}
              />
            ))}
          </TodoList>
          {todos.length === 0 && <div className="Empty-state">Suelte aquí</div>}
        </div>
      </SortableContext>
    </section>
  );
}

export default App;
