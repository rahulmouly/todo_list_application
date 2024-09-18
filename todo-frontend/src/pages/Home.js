import React, { useState } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import './styles/Home.css';

const Home = ({ token }) => {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div>
      <h1>Welcome to Todo App</h1>
      <TodoForm token={token} onAdd={addTodo} />
      <TodoList token={token} todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default Home;
