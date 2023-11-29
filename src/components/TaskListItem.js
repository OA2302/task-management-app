import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/TaskListItem.css';

function TaskListItems({ task, onDelete, onEdit }) {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(task.completed);

  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleCheckboxChange = () => {
    const updatedTask = { ...task, completed: !completed };
    setCompleted(!completed);
    onEdit(updatedTask);
  };

  const handleEdit = () => {
    onEdit(task.id);  // Pass the task ID to onEdit function
    navigate(`/edit/${task.id}`);
  };
  

  const itemStyle = completed ? { textDecoration: 'line-through' } : {};

  return (
    <div className="task-list-item" style={itemStyle}>
      <div className="task-details">
        <div className="task-name">{task.name}</div>
        <div className="task-description">{task.description}</div>
        <div className="task-priority">Priority: {task.priority}</div>
      </div>
      <div className="task-actions">
        <input
          type="checkbox"
          className="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
        />
        <button className="edit-button" onClick={handleEdit}>
          Edit
        </button>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

TaskListItems.propTypes = {
  task: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default TaskListItems;
