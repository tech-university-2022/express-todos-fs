const express = require('express');
const todoHandlers = require('../handlers/todos.handler');

const todoRouter = express.Router();
todoRouter.get('/', todoHandlers.getTodosHandler);
todoRouter.post('/', todoHandlers.addTodoHandler);
todoRouter.put('/',todoHandlers.changeTodoHandler);
todoRouter.delete('/',todoHandlers.removeTodoHandler);

module.exports = {
    todoRouter,
}