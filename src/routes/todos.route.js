const express = require('express');
const {
  getTodos, addTodos, updateTodo, deleteTodo,
} = require('../handlers/todos.handler');

const todoRouter = express.Router();

todoRouter.get('/get-todos', getTodos);
todoRouter.post('/add-todo', addTodos);
todoRouter.patch('/update-todo', updateTodo);
todoRouter.delete('/delete-todo', deleteTodo);
module.exports = {
  todoRouter,
};
