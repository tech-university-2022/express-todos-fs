const express = require("express");
const fs = require("fs");
const filePath = "./resources/todos.txt";
const { promisfyReadFile, promisfyWriteFile } = require('../utils/todos.utils');

const getTodoService = async () => {
    const todos = await promisfyReadFile(filePath);
    return todos;
}

const postTodoService = async (newTodo) => {
    await promisfyWriteFile(filePath, newTodo);
    return;
}

module.exports = {
    getTodoService,
    postTodoService
}