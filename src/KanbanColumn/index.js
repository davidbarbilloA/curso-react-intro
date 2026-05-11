import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import './KanbanColumn.css';

function KanbanColumn({ id, title, todos, onDelete, onToggle }) {
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
                onToggle={() => props.onToggle(todo.id)}
              />
            ))}
          </TodoList>
          {todos.length === 0 && <div className="Empty-state">Suelte aquí</div>}
        </div>
      </SortableContext>
    </section>
  );
}

export { KanbanColumn };
