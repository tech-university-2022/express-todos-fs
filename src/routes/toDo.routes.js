const express = require('express');

const {
  getTodosHandler, addTodoHandler, modifyTodoHandler, deleteTodoHandler,
} = require('../handlers/todo.handler');

const router = express.Router();

router.get('/', getTodosHandler);
router.post('/', addTodoHandler);
router.put('/:id', modifyTodoHandler);
router.delete('/:id', deleteTodoHandler);

module.exports = {
  todoRouter: router,
};