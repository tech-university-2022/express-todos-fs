const fileOp = require('../services/todos.service');

const getTodos = async (req, res) => {
  try {
    const todos = await fileOp.getTodosFromFile();
    res.json(todos).status(200);
  } catch (err) {
    res.json({
      error: err.message,
    });
  }
};
const addTodos = async (req, res) => {
  try {
    const data = req.body;
    const todos = await fileOp.addTodosToFile(data);
    res.json(todos);
  } catch (err) {
    res.json({
      error: err.message,
    });
  }
};
const updateTodo = async (req, res) => {
  try {
    const data = req.body;
    const message = await fileOp.updateTodoInFile(data);
    res.send(message);
  } catch (err) {
    res.json({
      error: err.message,
    });
  }
};
const deleteTodo = async (req, res) => {
  try {
    const data = req.body;
    const message = await fileOp.deleteTodoFromFile(data);
    res.send(message);
  } catch (err) {
    res.json({
      error: err.message,
    });
  }
};
module.exports = {
  getTodos,
  addTodos,
  updateTodo,
  deleteTodo,
};
