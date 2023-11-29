import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTask, editTask } from '../utils/localStorage';
import '../styles/EditTaskForm.css';

function EditTaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    name: '',
    description: '',
    priority: 'low',
    completed: false,
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    const existingTask = getTask(id);
  
    if (existingTask) {
      setTask(existingTask);
    }
  }, [id]);
  
  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editTask(id, task);
    setShowSuccessAlert(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="edit-task-container">
      <h1>Edit Task</h1>
      {showSuccessAlert && (
        <div className="success-alert">Task successfully updated!</div>
      )}
      <form className="edit-task-form" onSubmit={handleSubmit}>
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
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditTaskForm;
