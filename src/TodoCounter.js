import './TodoCounter.css';

function TodoCounter({ total, completed }) {

    return (
        <div className="TodoCounter-container">
            <h2 className="TodoCounter-title">Progreso</h2>
            <div className="TodoCounter-stats">
                <div className="stat-item">
                    <span className="stat-value" style={{ color: 'var(--accent)' }}>{total}</span>
                    <span className="stat-label">Total</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value" style={{ color: 'var(--success)' }}>{completed}</span>
                    <span className="stat-label">Completadas</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value" style={{ color: 'var(--warning)' }}>{total - completed}</span>
                    <span className="stat-label">Pendientes</span>
                </div>
            </div>
        </div>
    );
}

export { TodoCounter };