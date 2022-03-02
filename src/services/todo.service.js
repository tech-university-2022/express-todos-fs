const express = require("express");
const fs = require("fs");
const filePath = "./resources/todos.txt";
const { promisfyReadFile, promisfyAppendFile, promisfyWriteFile, promisfyUpdateFile } = require('../utils/todos.utils');


const getTodoService = async () => {
    const todos = await promisfyReadFile(filePath);
    return todos;
}

const postTodoService = async (newTodo) => {
    const todos = await promisfyReadFile(filePath);
    const todoId = todos.length;
    const todo = `${todoId}|${newTodo}\n`
    await promisfyAppendFile(filePath, todo);
    return;
}

const updateTodoService = async (id, changedTodo) => {
    const todos = await promisfyReadFile(filePath);
    const oldData = todos[id - 1];
    changedTodo = `${id}|${changedTodo}\n`
    await promisfyUpdateFile(filePath, oldData, changedTodo);
    return;
}

const deleteTodoService = async (id) => {
    const todos = await promisfyReadFile(filePath);
    console.log(`from line 40 ${todos}`);
    todos.splice(id - 1, 1);
    console.log(`from line 42 ${todos}`);
    const modifiedTodo = todos.map((element, index) => {
        if (index >= (id - 1)) {
            element = `${(index + 1).toString()}|${element.split('|')[1]}`;
        }
        return element;
    });
    modifiedTodoString = modifiedTodo.reduce((prevContent, current) => {
        prevContent += `${current}\n`;
        return prevContent;
    }, '');
    console.log(`from line 53 ${modifiedTodoString}`);
    await promisfyWriteFile(filePath, modifiedTodoString);

}

module.exports = {
    getTodoService,
    postTodoService,
    updateTodoService,
    deleteTodoService
}
