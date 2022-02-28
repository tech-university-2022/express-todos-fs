const express = require('express');

const {
  getTodosHandler, addTodoHandler, modifyTodoHandler, deleteTodoHandler,
} = require('../handlers/todo.handler');

const router = express.Router();

router.get('/', getTodosHandler);
router.post('/', addTodoHandler);
router.put('/', modifyTodoHandler);
router.delete('/', deleteTodoHandler);

module.exports = {
  todoRouter: router,
};
