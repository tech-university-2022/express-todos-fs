const express = require('express');
const {
  todoReadHandler, todoAppendHandler, todoUpdateHandler, todoDeleteHandler,
} = require('../handlers/todo.handlers');

const todoRouter = express.Router();
todoRouter.get('/', todoReadHandler);
todoRouter.post('/addToDo', todoAppendHandler);
todoRouter.patch('/:index', todoUpdateHandler);
todoRouter.delete('/delete/:index', todoDeleteHandler);

module.exports = {
  todoRouter,
};
