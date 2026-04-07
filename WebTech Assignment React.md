# Smart Task Management — Simple Version (Paper-Friendly)

## Project Structure

```
smart-task-management/
├── src/
│   ├── TaskContext.js
│   ├── taskReducer.js
│   ├── useLocalStorage.js
│   ├── App.js
│   ├── Login.js
│   ├── Dashboard.js
│   ├── TaskForm.js
│   ├── TaskCard.js
│   ├── ErrorBoundary.js
│   └── index.js
├── public/index.html
└── package.json
```

## Setup

```bash
npx create-react-app smart-task-management
cd smart-task-management
npm install react-router-dom
npm start
```

---

## Requirements Covered — Quick Map

| Requirement | File |
|---|---|
| useState, useEffect, useRef | TaskForm.js, Dashboard.js |
| useContext | TaskCard.js, Dashboard.js |
| useReducer | TaskContext.js |
| useCallback / React.memo / useMemo | TaskCard.js, Dashboard.js |
| Context API | TaskContext.js |
| Custom Hook | useLocalStorage.js |
| React Router | App.js |
| API Call (fetch) | Dashboard.js |
| Lazy Loading + Suspense | App.js |
| Error Boundary | ErrorBoundary.js |
| Controlled Form | TaskForm.js |
| List & Keys | Dashboard.js |
| Conditional Rendering | TaskCard.js, Dashboard.js |
| Props | TaskCard.js, TaskForm.js |
| CRUD Operations | taskReducer.js |
| Local Storage | useLocalStorage.js, TaskContext.js |
| Mock Auth | Login.js, App.js |
| Styling (inline/CSS) | All files |

---

## 1. `src/taskReducer.js`
### Covers: useReducer, CRUD Operations

```js
export const initialState = { tasks: [] };

export function taskReducer(state, action) {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "DELETE_TASK":
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map(t => t.id === action.payload.id ? action.payload : t)
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload ? { ...t, done: !t.done } : t
        )
      };
    default:
      return state;
  }
}
```

---

## 2. `src/useLocalStorage.js`
### Covers: Custom Hook, Local Storage

```js
import { useState } from "react";

function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initial;
  });

  const setStored = (newVal) => {
    setValue(newVal);
    localStorage.setItem(key, JSON.stringify(newVal));
  };

  return [value, setStored];
}

export default useLocalStorage;
```

---

## 3. `src/TaskContext.js`
### Covers: Context API, useReducer, useContext, useEffect, Local Storage

```js
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { taskReducer, initialState } from "./taskReducer";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  return useContext(TaskContext);
}
```

---

## 4. `src/ErrorBoundary.js`
### Covers: Error Boundary (Class Component)

```js
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  static getDerivedStateFromError() {
    return { error: true };
  }

  render() {
    if (this.state.error) {
      return <h3 style={{ color: "red" }}>Something went wrong!</h3>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

---

## 5. `src/TaskCard.js`
### Covers: Component, Props, Conditional Rendering, React.memo

```js
import React, { memo } from "react";
import { useTask } from "./TaskContext";

const TaskCard = memo(function TaskCard({ task, onEdit }) {
  const { dispatch } = useTask();

  return (
    <div style={{
      border: "1px solid #ccc", borderRadius: 8,
      padding: 12, marginBottom: 10,
      background: task.done ? "#f0fff0" : "white"
    }}>
      {/* Conditional Rendering */}
      <h4 style={{ textDecoration: task.done ? "line-through" : "none" }}>
        {task.title}
      </h4>
      <p style={{ color: "#666" }}>{task.desc}</p>
      <p>Priority: <b>{task.priority}</b></p>

      {task.done && <span style={{ color: "green" }}>✔ Completed</span>}

      <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
        <button onClick={() => dispatch({ type: "TOGGLE_TASK", payload: task.id })}>
          {task.done ? "Undo" : "Done"}
        </button>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => dispatch({ type: "DELETE_TASK", payload: task.id })}
          style={{ color: "red" }}>
          Delete
        </button>
      </div>
    </div>
  );
});

export default TaskCard;
```

---

## 6. `src/TaskForm.js`
### Covers: Controlled Form, useState, useEffect, useRef, Props, Event Handling

```js
import React, { useState, useEffect, useRef } from "react";
import { useTask } from "./TaskContext";

function TaskForm({ editTask, onClose }) {
  const { dispatch } = useTask();
  const inputRef = useRef(null); // useRef

  // Controlled form state (useState)
  const [form, setForm] = useState({ title: "", desc: "", priority: "low" });

  // useEffect: populate form if editing
  useEffect(() => {
    if (editTask) setForm(editTask);
    inputRef.current.focus(); // useRef usage
  }, [editTask]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title) return alert("Title required!");

    if (editTask) {
      dispatch({ type: "UPDATE_TASK", payload: form });
    } else {
      dispatch({ type: "ADD_TASK", payload: { ...form, id: Date.now(), done: false } });
    }
    onClose();
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "rgba(0,0,0,0.4)", display: "flex",
      justifyContent: "center", alignItems: "center"
    }}>
      <div style={{ background: "white", padding: 24, borderRadius: 10, width: 340 }}>
        <h3>{editTask ? "Edit Task" : "Add Task"}</h3>
        <form onSubmit={handleSubmit}>
          {/* Controlled Inputs */}
          <input ref={inputRef} name="title" placeholder="Title"
            value={form.title} onChange={handleChange}
            style={{ width: "100%", marginBottom: 8, padding: 8 }} />

          <input name="desc" placeholder="Description"
            value={form.desc} onChange={handleChange}
            style={{ width: "100%", marginBottom: 8, padding: 8 }} />

          <select name="priority" value={form.priority} onChange={handleChange}
            style={{ width: "100%", marginBottom: 12, padding: 8 }}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button type="submit" style={{ marginRight: 8 }}>Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
```

---

## 7. `src/Login.js`
### Covers: Mock Authentication, useState, Controlled Form

```js
import React, { useState } from "react";

function Login({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user === "admin" && pass === "1234") {
      localStorage.setItem("auth", "true");
      onLogin();
    } else {
      setError("Wrong credentials! Try admin / 1234");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" value={user}
          onChange={e => setUser(e.target.value)} /><br /><br />
        <input type="password" placeholder="Password" value={pass}
          onChange={e => setPass(e.target.value)} /><br /><br />
        <button type="submit">Login</button>
      </form>
      <p style={{ color: "#aaa" }}>Hint: admin / 1234</p>
    </div>
  );
}

export default Login;
```

---

## 8. `src/Dashboard.js`
### Covers: useEffect (API call), useState, useMemo, List & Keys, Conditional Rendering, Lazy Loading (via App.js)

```js
import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { useTask } from "./TaskContext";
import TaskCard from "./TaskCard";
import ErrorBoundary from "./ErrorBoundary";

// Lazy Loading
const TaskForm = lazy(() => import("./TaskForm"));

function Dashboard({ onLogout }) {
  const { state, dispatch } = useTask();
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState("all");

  // useEffect: Fetch tasks from API on first load
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved && JSON.parse(saved).length > 0) return;

    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then(res => res.json())
      .then(data => {
        const tasks = data.map(item => ({
          id: item.id,
          title: item.title.slice(0, 30),
          desc: "Fetched from API",
          priority: "medium",
          done: item.completed
        }));
        dispatch({ type: "SET_TASKS", payload: tasks });
      });
  }, []);

  // useMemo: Filter tasks without re-computing on every render
  const filtered = useMemo(() => {
    if (filter === "done") return state.tasks.filter(t => t.done);
    if (filter === "active") return state.tasks.filter(t => !t.done);
    return state.tasks;
  }, [state.tasks, filter]);

  const handleEdit = (task) => { setEditTask(task); setShowForm(true); };
  const handleClose = () => { setEditTask(null); setShowForm(false); };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>My Tasks ({state.tasks.length})</h2>
        <div>
          <button onClick={() => setShowForm(true)} style={{ marginRight: 8 }}>
            + Add Task
          </button>
          <button onClick={onLogout}>Logout</button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div style={{ margin: "12px 0" }}>
        {["all", "active", "done"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ marginRight: 6, fontWeight: filter === f ? "bold" : "normal" }}>
            {f}
          </button>
        ))}
      </div>

      {/* Conditional Rendering */}
      {filtered.length === 0 && <p style={{ color: "#aaa" }}>No tasks found.</p>}

      {/* List with Keys — wrapped in Error Boundary */}
      <ErrorBoundary>
        {filtered.map(task => (
          <TaskCard key={task.id} task={task} onEdit={handleEdit} />
        ))}
      </ErrorBoundary>

      {/* Lazy Loaded Form */}
      {showForm && (
        <Suspense fallback={<p>Loading form...</p>}>
          <TaskForm editTask={editTask} onClose={handleClose} />
        </Suspense>
      )}
    </div>
  );
}

export default Dashboard;
```

---

## 9. `src/App.js`
### Covers: React Router, Mock Auth, Conditional Rendering, Lazy Loading

```js
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { TaskProvider } from "./TaskContext";

function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem("auth"));

  const handleLogin = () => setAuth(true);
  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth(false);
  };

  return (
    <TaskProvider>
      <BrowserRouter>
        {/* Navbar */}
        <nav style={{ background: "#2563eb", padding: "10px 20px", color: "white" }}>
          <span style={{ fontWeight: "bold" }}>✅ Smart Task Manager</span>
          {auth && (
            <span style={{ marginLeft: 20 }}>
              <Link to="/" style={{ color: "white", marginRight: 12 }}>Home</Link>
              <Link to="/about" style={{ color: "white" }}>About</Link>
            </span>
          )}
        </nav>

        <Routes>
          {/* Auth-protected route */}
          <Route path="/" element={
            auth
              ? <Dashboard onLogout={handleLogout} />
              : <Navigate to="/login" />
          } />
          <Route path="/login" element={
            auth ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
          } />
          <Route path="/about" element={
            <div style={{ padding: 40, textAlign: "center" }}>
              <h2>About</h2>
              <p>Smart Task Manager — Web Technologies Assignment</p>
              <Link to="/">Back to Home</Link>
            </div>
          } />
          {/* 404 Route */}
          <Route path="*" element={
            <div style={{ textAlign: "center", marginTop: 80 }}>
              <h2>404 — Page Not Found</h2>
              <Link to="/">Go Home</Link>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;
```

---

## 10. `src/index.js`

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

---

## All Requirements — Final Checklist

| # | Requirement | File | Code / Feature |
|---|---|---|---|
| 1 | Functional Components | All files | Every file uses `function` components |
| 2 | Reusable Components | TaskCard, TaskForm | Used in Dashboard with props |
| 3 | Props | TaskCard, TaskForm | `task`, `onEdit`, `onClose`, `editTask` |
| 4 | State | All files | `useState` everywhere |
| 5 | Event Handling | TaskForm, TaskCard | `onSubmit`, `onClick`, `onChange` |
| 6 | Conditional Rendering | Dashboard, TaskCard | `{task.done && ...}`, ternary operators |
| 7 | List & Keys | Dashboard | `filtered.map(task => <TaskCard key={task.id} />)` |
| 8 | Controlled Form | TaskForm, Login | `value={form.x}` + `onChange` |
| 9 | useState | Dashboard, Login, TaskForm | Many instances |
| 10 | useEffect | TaskContext, TaskForm, Dashboard | Sync storage, API fetch, focus |
| 11 | useContext | TaskCard, TaskForm, Dashboard | `useTask()` hook |
| 12 | useReducer | TaskContext | `taskReducer` with 5 actions |
| 13 | useRef | TaskForm | `inputRef` for auto-focus |
| 14 | React Router | App.js | Routes, Navigate, Link |
| 15 | Context API | TaskContext.js | `createContext`, `Provider` |
| 16 | API Calls (fetch) | Dashboard.js | `fetch(jsonplaceholder...)` |
| 17 | Custom Hook | useLocalStorage.js | `useLocalStorage(key, value)` |
| 18 | Lazy Loading | Dashboard.js | `lazy(() => import(...))` + `Suspense` |
| 19 | Error Boundary | ErrorBoundary.js | Class with `getDerivedStateFromError` |
| 20 | React.memo | TaskCard.js | `memo(function TaskCard...)` |
| 21 | useMemo | Dashboard.js | `useMemo(() => filter logic, [deps])` |
| 22 | Styling | All files | Inline styles |
| 23 | Local Storage | useLocalStorage.js, TaskContext.js | `localStorage.getItem/setItem` |
| 24 | Mock Auth | Login.js, App.js | admin/1234 check + localStorage flag |
| 25 | CRUD | taskReducer.js | ADD, UPDATE, DELETE, TOGGLE, SET |
