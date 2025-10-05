import React, { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");

  // Load todos from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("todos_v1");
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos_v1", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const trimmed = task.trim();
    if (!trimmed) return;
    const newTodo = {
      id: Date.now().toString(),
      text: trimmed,
      done: false,
    };
    setTodos(prev => [newTodo, ...prev]);
    setTask("");
  };

  const toggleDone = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? {...t, done: !t.done} : t));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const clearAll = () => {
    if (window.confirm("Are you sure you want to clear all todos?")) {
      setTodos([]);
    }
  };

  const filtered = todos.filter(t => t.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">📝 Todo App (React)</h1>

        <div className="row">
          <input
            className="input"
            placeholder="Add new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addTodo(); }}
          />
          <button className="btn" onClick={addTodo}>Add</button>
        </div>

        <div className="row" style={{marginTop: 10}}>
          <input
            className="input"
            placeholder="Search todos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn danger" onClick={clearAll}>Clear All</button>
        </div>

        <p className="muted">{filtered.length} tasks shown — total: {todos.length}</p>

        <ul className="list">
          {filtered.length === 0 && <li className="empty">No todos found</li>}
          {filtered.map(todo => (
            <li key={todo.id} className={"item " + (todo.done ? "done" : "")}>
              <div onClick={() => toggleDone(todo.id)} className="check">
                {todo.done ? "✔" : "○"}
              </div>
              <div className="text">{todo.text}</div>
              <div className="actions">
                <button className="small" onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>

        
      </div>
    </div>
  );
}

export default App;
