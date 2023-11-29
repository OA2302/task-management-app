import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from './TaskList';
import { getTasks } from '../utils/localStorage';

jest.mock('../utils/localStorage', () => ({
  getTasks: jest.fn(),
}));

describe('TaskList Component', () => {
  test('renders task list', () => {
    getTasks.mockReturnValueOnce([
      { id: 1, name: 'Task 1', completed: false },
      { id: 2, name: 'Task 2', completed: true },
    ]);

    render(<TaskList />);

    expect(screen.getByText('Task List')).toBeInTheDocument();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
});
