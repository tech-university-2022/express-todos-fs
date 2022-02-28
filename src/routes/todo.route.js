const express = require('express');
const {
  // eslint-disable-next-line no-unused-vars
  getTodoHandler, postTodoHandler, putTodoHandler, deleteTodoHandler,
} = require('../handlers/todo.handler');

const todoRouter = express.Router();
todoRouter.get('/', getTodoHandler);
todoRouter.post('/', postTodoHandler);
todoRouter.put('/:index', putTodoHandler);
todoRouter.delete('/:index', deleteTodoHandler);
module.exports = {
  todoRouter,
};
