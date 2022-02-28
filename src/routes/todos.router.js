const express = require('express');
const todoHandlers = require('../handlers/todos.handler');

const getAndAddTodosRouter = express.Router();
getAndAddTodosRouter.get('/', todoHandlers.getTodosHandler);
getAndAddTodosRouter.post('/', todoHandlers.addTodoHandler);
getAndAddTodosRouter.put('/',todoHandlers.changeTodoHandler);
module.exports = {
    getAndAddTodosRouter,
}