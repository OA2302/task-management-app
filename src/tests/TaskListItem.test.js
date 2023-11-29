import React from 'react';
import { Link } from 'react-router-dom';

function TaskListItem({ task, onDelete, onComplete }) {
  return (
    <div>
      <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.name}
      </h3>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onComplete(task.id)}
      />
      <button onClick={() => onDelete(task.id)}>Delete</button>
      <Link to={`/edit/${task.id}`}>
        <button>Edit</button>
      </Link>
    </div>
  );
}

export default TaskListItem;
