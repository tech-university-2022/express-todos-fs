const express = require("express");
const fs = require("fs");
const filePath = "./resources/todos.txt";
const { promisfyReadFile, promisfyAppendFile, promisfyWriteFile, promisfyUpdateFile } = require('../utils/todos.utils');

const listTodos = async () => {
    const todoList = await fetchTodos(path);
    const todoObject = [];
    todoList.forEach((data) => {
        const [todoId, todoTask] = data;
        todoObject.push({ todoId, todoTask });
    })
    return todoObject
};


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
        if (index >= (id-1)) {
            element = `${(index + 1).toString()}|${element.split('|')[1]}`;
        }
        return element;
    });
    modifiedTodoString =modifiedTodo.reduce((prevContent, current) => {
            prevContent += current;
            return prevContent;
          }, '');
    console.log(`from line 53 ${modifiedTodoString}`);
    await promisfyWriteFile(filePath,modifiedTodoString);
    //await utils.promisfyRemoveData(filePath, modifiedData);

    // const updatedTodoList=todos.filter((data)=>parseInt(data.todoId)!==parseInt(todoId))
    // console.log(updatedTodoList)
    // currentTodos = updatedTodoList.reduce((prevContent, currentObject) => {
    //     prevContent += `${currentObject.todoId}|${currentObject.todoTask}\r\n`;
    //     return prevContent;
    //   }, '');
    // console.log(currentTodos);
    // await promisfyWriteFile(path,currentTodos)
    // return "Updated"

    // const data = await utils.promisfyReadFiles(filePath);
    // data.splice((parseInt(id) - 1), 1);
    // const modifiedData = data.map((element, index) => {
    //     if (index >= (parseInt(id) - 1)) {
    //         element = `${(index + 1).toString()}|${element.split('|')[1]}`;
    //     }
    //     return element;
    // });
    // await utils.promisfyRemoveData(filePath, modifiedData);
}

module.exports = {
    getTodoService,
    postTodoService,
    updateTodoService,
    deleteTodoService
}

const updateTodo = async (todoId, newTodoTask) => {
    const todos = await listTodos();
    let filteredTodos = todos.filter((todo) => parseInt(todo.todoId) === parseInt(todoId));
    const oldData = filteredTodos[0].todoTask
    await updateFile(path, oldData, newTodoTask)
    const todoList = listTodos();
    return todoList;
}

const deleteTodoTask = async (todoId) => {
    const todos = await listTodos();
    console.log(todos)
    console.log(todoId)
    const updatedTodoList = todos.filter((data) => parseInt(data.todoId) !== parseInt(todoId))
    console.log(updatedTodoList)
    currentTodos = updatedTodoList.reduce((prevContent, currentObject) => {
        prevContent += `${currentObject.todoId}|${currentObject.todoTask}\r\n`;
        return prevContent;
    }, '');
    console.log(currentTodos);
    await promisfyWriteFile(path, currentTodos)
    return "Updated"
}