import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddTaskForm from './AddTaskForm';
import { addTask } from '../utils/localStorage';

jest.mock('../utils/localStorage', () => ({
  addTask: jest.fn(),
}));

describe('AddTaskForm Component', () => {
  test('submits form and adds task', () => {
    render(
      <MemoryRouter>
        <AddTaskForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Task Name:'), {
      target: { value: 'New Task' },
    });
    fireEvent.change(screen.getByLabelText('Task Description:'), {
      target: { value: 'Description for new task' },
    });
    fireEvent.change(screen.getByLabelText('Priority:'), {
      target: { value: 'medium' },
    });

    fireEvent.submit(screen.getByRole('button', { name: 'Add Task' }));

    expect(addTask).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'New Task',
        description: 'Description for new task',
        priority: 'medium',
      })
    );
  });

  test('requires task name', () => {
    render(
      <MemoryRouter>
        <AddTaskForm />
      </MemoryRouter>
    );

    fireEvent.submit(screen.getByRole('button', { name: 'Add Task' }));

    expect(addTask).not.toHaveBeenCalled();
    expect(screen.getByText('Task name is required.')).toBeInTheDocument();
  });
});
