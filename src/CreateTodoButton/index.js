import { useState } from 'react';
import './CreateTodoButton.css';

function CreateTodoButton({ addTodo }) {

    const [showFrom, setShowFrom] = useState(false);
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!title.trim()) return;

        addTodo(title);

        setTitle("");
        setShowFrom(false);
    }
    return (
    <>
        <button
            className="CreateTodoButton"
            onClick={() => {
                setShowFrom(true);
            }}
        >
            +
        </button>

        {showFrom && (
            <form className='TodosForm' onSubmit={handleSubmit}>
                <h3>Crear Tarea</h3>
                <input 
                    type='text'
                    placeholder='Escribe la tarea'
                    value = {title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button type='submit'>Guardar</button>
                <button type='button' onClick={() => setShowFrom(false)}>Cancelar</button>
            </form>
        )}
    </>
    );
}

export { CreateTodoButton };