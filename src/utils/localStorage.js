const TASKS_KEY = 'tasks';

export const getTasks = () => {
  const tasksJSON = localStorage.getItem(TASKS_KEY);
  return tasksJSON ? JSON.parse(tasksJSON) : [];
};

export const getTask = (id) => {
  const tasks = getTasks();
  return tasks.find((task) => task.id === parseInt(id));
};

export const addTask = (task) => {
  const tasks = getTasks();
  const newTasks = [...tasks, task];
  localStorage.setItem(TASKS_KEY, JSON.stringify(newTasks));
};

export const editTask = (id, updatedTask) => {
  const tasks = getTasks();
  const updatedTasks = tasks.map((task) =>
    task.id === parseInt(id) ? { ...task, ...updatedTask } : task
  );
  localStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
};

export const deleteTask = (id) => {
  const tasks = getTasks();
  const updatedTasks = tasks.filter((task) => task.id !== parseInt(id));
  localStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
};

export const markTaskCompleted = (id) => {
  const tasks = getTasks();
  const updatedTasks = tasks.map((task) =>
    task.id === parseInt(id) ? { ...task, completed: !task.completed } : task
  );
  localStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
};
