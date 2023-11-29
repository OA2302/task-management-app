import React, { useState, useEffect } from 'react';
import TaskListItems from './TaskListItem';
import './../styles/TaskList.css'
import { getTasks, deleteTask, markTaskCompleted } from '../utils/localStorage';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleDelete = (id) => {
    deleteTask(id);
    setTasks(getTasks());
  };

  const handleComplete = (id) => {
    markTaskCompleted(id);
    setTasks(getTasks());
  };

  return (
    <div>
      <h1>Task List</h1>
      {tasks.map((task) => (
        <TaskListItems
          key={task.id}
          task={task}
          onDelete={handleDelete}
          onEdit={handleComplete}
        />
      ))}
    </div>
  );
}

export default TaskList;
