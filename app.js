const { useState, useEffect } = React;

const classNames = {
    TODO_ITEM: "todo-container",
    TODO_CHECKBOX: "todo-checkbox",
    TODO_TEXT: "todo-text",
    TODO_DELETE: "todo-delete",
}

const TodoItem = ({ todo, onDelete, onToggle }) => {
    return (
        <li className={classNames.TODO_ITEM}>
            <input onClick={() => { onToggle(todo.id) }} className={classNames.TODO_CHECKBOX} type="checkbox" defaultChecked={todo?.checked || undefined} />
            <label className={classNames.TODO_TEXT}><span>{todo.text}</span></label>
            <button className={classNames.TODO_DELETE} onClick={() => { onDelete(todo.id) }}>delete</button>
        </li>
    )
}

function App() {
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todoArray') || "[]"));
    useEffect(() => {
        localStorage.setItem('todoArray', JSON.stringify(todos))
    }, [todos])

    function addTodo() {
        const text = prompt('Enter');
        const todo = { id: Date.now(), text, checked: false };
        setTodos([...todos, todo]);
    }
    function toggleCheckbox(key) {
        setTodos(todos.map(t => t.id === key ? { ...t, checked: !t.checked } : t));
        localStorage.setItem('todoArray', JSON.stringify(todos));
    }
    function deleteTodo(key) {
        const index = todos.findIndex(t => t.id === Number(key));
        if (index >= 0) {
            setTodos(todos.filter(t => t.id !== Number(key)));
        }
    }
    return (
        <div className="container center">
            <h1 className="center title">My TODO App</h1>
            <div className="flow-right controls">
                <span>Item count: <span id="item-count">{todos.length}</span></span>
                <span>Unchecked count: <span id="unchecked-count">{todos.filter((todoEl) => !todoEl?.checked).length}</span></span>
            </div>
            <button className="button center" onClick={addTodo}>New TODO</button>
            <ul id="todo-list" className="todo-list">
                {todos.map(t => <TodoItem onToggle={toggleCheckbox} onDelete={deleteTodo} key={t.id} todo={t} />)}
            </ul>
        </div>
    );
}

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

root.render(<App />);