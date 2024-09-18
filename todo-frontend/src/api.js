import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser = async (username, email, password) => {
  await axios.post(`${API_URL}/auth/register`, { username, email, password });
};

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data.token;
};

export const getTodos = async (token) => {
  const response = await axios.get(`${API_URL}/todos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addTodo = async (token, todo) => {
  const response = await axios.post(`${API_URL}/todos`, todo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateTodo = async (token, id, todo) => {
  const response = await axios.put(`${API_URL}/todos/${id}`, todo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteTodo = async (token, id) => {
  const response = await axios.delete(`${API_URL}/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
