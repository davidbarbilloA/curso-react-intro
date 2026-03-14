import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './TodoItem.css';
import { FiCheck } from "react-icons/fi";
import { IoReload } from "react-icons/io5";
import { MdDelete } from "react-icons/md";


function TodoItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  if (props.isOverlay) {
    return (
      <li className="TodoItem TodoItem--overlay">
        <div className="TodoItem-tag">Web design</div>
        <div className="TodoItem-header">
          <p className={`TodoItem-p ${props.completed && "TodoItem-p--completed"}`}>
            {props.text}
          </p>
          <button className="TodoItem-options">⋮</button>
        </div>
        <div className="TodoItem-footer">
          <span className={`TodoItem-check ${props.completed ? "TodoItem-check-completed" : "TodoItem-check-pending"}`}>
            {props.completed ? <FiCheck /> : <IoReload />}
          </span>
        </div>
      </li>
    );
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`TodoItem ${isDragging ? "TodoItem--dragging" : ""}`}
    >
      <div className="TodoItem-tag" {...attributes} {...listeners}>Web design</div>
      <div className="TodoItem-header">
        <p 
          className={`TodoItem-p ${props.completed && "TodoItem-p--completed"}`}
          {...attributes} 
          {...listeners}
        >
          {props.text}
        </p>
        <button 
          className="TodoItem-delete"
          onClick={(e) => {
            e.stopPropagation();
            props.onDelete();
          }}
        >
          <MdDelete />
        </button>
      </div>

      <div className="TodoItem-footer" {...attributes} {...listeners}>
        <span className={`TodoItem-check ${props.completed ? "TodoItem-check-completed" : "TodoItem-check-pending"}`}>
            {props.completed ? <FiCheck /> : <IoReload />}
        </span>
      </div>
    </li>
  );
}

export { TodoItem };
