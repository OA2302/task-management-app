import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTask } from '../utils/localStorage';
import '../styles/AddTaskForm.css';

function AddTaskForm() {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    name: '',
    description: '',
    priority: 'low',
    completed: false,
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.name) {
      // Prevent form submission if task name is empty
      return;
    }

    addTask(task);
    setTask({
      name: '',
      description: '',
      priority: 'low',
      completed: false,
    });
    setSuccessMessage('Task added successfully!');

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
      // Navigate to the home page after success
      navigate('/');
    }, 3000);
  };

  return (
    <div className="add-task-container">
      <h1>Add Task</h1>
      <form className="add-task-form" onSubmit={handleSubmit}>
        <label className="label">
          Task Name:
          <input
            type="text"
            name="name"
            value={task.name}
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <label className="label">
          Task Description:
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <label className="label">
          Priority:
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="select-field"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <button type="submit" className="button">
          Save Task
        </button>
      </form>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
}

export default AddTaskForm;
