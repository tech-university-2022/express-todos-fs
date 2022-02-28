const express = require("express");
const todoRouter = express.Router();

const { getTodoHandler, postTodoHandler } = require("../handlers/todo.handler");

todoRouter.get('/', getTodoHandler);
todoRouter.post('/', postTodoHandler);

module.exports = {
    todoRouter,
}