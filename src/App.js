import React from 'react';
import { HashRouter as Router, Link, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import EditTaskForm from './components/EditTaskForm';
import '../src/styles/App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1>Task Management App</h1>
        <p>Welcome To Our Task Management App.<br/> We are here to help!!!</p>
        <nav>
          <Link to="/">Task List</Link>
          <Link to="/add">Add Task</Link>
        </nav>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<AddTaskForm />} />
          <Route path="/edit/:id" element={<EditTaskForm />} />
        </Routes>
        <footer><small>OA2302 • © 2023</small></footer>
      </div>
    </Router>
  );
}

export default App;
