const express = require('express');
const { listTodoHandler,addTodoHandler,updateTodoHandler,deletedTodoHandler } = require('../handlers/todo.handler');

const router = express.Router();
router.get('/', listTodoHandler);
router.post('/',addTodoHandler);
router.patch('/:id',updateTodoHandler);
router.delete('/:id',deletedTodoHandler);

module.exports = {
  TodoRouter: router,
};