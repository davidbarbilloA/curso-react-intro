import { useState } from 'react';
import './CreateTodoButton.css';

function CreateTodoButton() {

    const [showFrom, setShowFrom] = useState(false);
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newTodo ={
            id: Date.now().toString(),
            text: title,
            status: 'created',
        };

        const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];

        const updatedTodos = [...storedTodos, newTodo];
        localStorage.setItem("todos", JSON.stringify(updatedTodos));

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