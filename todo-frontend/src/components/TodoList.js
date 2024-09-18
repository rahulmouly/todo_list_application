import React, { useEffect, useState } from 'react';
import { getTodos, deleteTodo, updateTodo } from '../api';
import './styles/TodoList.css';
const TodoList = ({ token }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const result = await getTodos(token);
      setTodos(result);
    };

    fetchTodos();
  }, [token]);

  const handleDelete = async (id) => {
    await deleteTodo(token, id);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const handleStatusChange = async (id, status) => {
    await updateTodo(token, id, { status });
    setTodos(todos.map(todo => todo._id === id ? { ...todo, status } : todo));
  };

  return (
    <div>
      <h2>Todo List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo._id}>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>
                <select
                  value={todo.status}
                  onChange={(e) => handleStatusChange(todo._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDelete(todo._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
