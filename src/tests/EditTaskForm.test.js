import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import EditTaskForm from './EditTaskForm';
import { getTask, editTask } from '../utils/localStorage';

jest.mock('../utils/localStorage', () => ({
  getTask: jest.fn(),
  editTask: jest.fn(),
}));

describe('EditTaskForm Component', () => {
  test('renders edit task form', () => {
    getTask.mockReturnValueOnce({
      id: 1,
      name: 'Task to Edit',
      description: 'Description for editing task',
      priority: 'high',
      completed: false,
    });

    render(
      <MemoryRouter initialEntries={['/edit/1']}>
        <Route path="/edit/:id" component={EditTaskForm} />
      </MemoryRouter>
    );

    expect(screen.getByText('Edit Task')).toBeInTheDocument();
    expect(screen.getByLabelText('Task Name:')).toHaveValue('Task to Edit');
    expect(screen.getByLabelText('Task Description:')).toHaveValue(
      'Description for editing task'
    );
    expect(screen.getByLabelText('Priority:')).toHaveValue('high');
  });

  test('submits form and edits task', () => {
    getTask.mockReturnValueOnce({
      id: 1,
      name: 'Task to Edit',
      description: 'Description for editing task',
      priority: 'high',
      completed: false,
    });

    render(
      <MemoryRouter initialEntries={['/edit/1']}>
        <Route path="/edit/:id" component={EditTaskForm} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Task Name:'), {
      target: { value: 'Edited Task' },
    });
    fireEvent.change(screen.getByLabelText('Task Description:'), {
      target: { value: 'Updated description' },
    });
    fireEvent.change(screen.getByLabelText('Priority:'), {
      target: { value: 'low' },
    });

    fireEvent.submit(screen.getByRole('button', { name: 'Save Changes' }));

    expect(editTask).toHaveBeenCalledWith(1, {
      name: 'Edited Task',
      description: 'Updated description',
      priority: 'low',
    });
  });
});
