const Todo = require('../models/todoModel');

// Get all todos for the logged-in user
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create a new todo
exports.createTodo = async (req, res) => {
  const { title, description, dueDate } = req.body;

  try {
    const todo = new Todo({
      user: req.user.id,
      title,
      description,
      dueDate,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  const { title, description, dueDate, status } = req.body;

  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, {
      title,
      description,
      dueDate,
      status,
    }, { new: true });

    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
