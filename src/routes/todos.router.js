const express = require("express");
const todoRouter = express.Router();

const { getTodoHandler, postTodoHandler, updateTodoHandler, deleteTodoHandler } = require("../handlers/todo.handler");

todoRouter.get('/', getTodoHandler);
todoRouter.post('/', postTodoHandler);
todoRouter.patch('/:id', updateTodoHandler);
todoRouter.delete('/:id', deleteTodoHandler);

module.exports = {
    todoRouter,
}