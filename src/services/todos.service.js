const {fetchTodos,saveTodos,updateFile,deleteTodo,promisfyWriteFile} = require('../utils/todo.utils')

const fs = require('fs');

const path = 'C:/Users/LAVANYA A M/Desktop/git/express-todos-fs/resources/todos.txt'

const listTodos = async () => {
    const todoList = await fetchTodos(path);
    const todoObject=[];
    todoList.forEach((data)=>{
        const [todoId,todoTask] = data;
        todoObject.push({todoId,todoTask});
    })
    return todoObject
};

const addTodo = async (todoTask) => {
    const todoArray = await fetchTodos(path);
    const todoId = todoArray.length +1
    const todo = `${todoId}|${todoTask}\r\n`
    await saveTodos(path,todo);
    const todoList = listTodos(); 
    return todoList;
};

const updateTodo = async(todoId,newTodoTask) =>{
    const todos = await listTodos();
    let filteredTodos = todos.filter((todo) => parseInt(todo.todoId) === parseInt(todoId));
    const oldData = filteredTodos[0].todoTask
    await updateFile(path,oldData,newTodoTask)
    const todoList = listTodos(); 
    return todoList;
}

const deleteTodoTask = async(todoId)=>{
    const todos = await listTodos();
    console.log(todos)
    console.log(todoId)
    const updatedTodoList=todos.filter((data)=>parseInt(data.todoId)!==parseInt(todoId))
    console.log(updatedTodoList)
    currentTodos = updatedTodoList.reduce((prevContent, currentObject) => {
        prevContent += `${currentObject.todoId}|${currentObject.todoTask}\r\n`;
        return prevContent;
      }, '');
    console.log(currentTodos);
    await promisfyWriteFile(path,currentTodos)
    return "Updated"
}

module.exports = {
    listTodos,
    addTodo,
    updateTodo,
    deleteTodoTask
}; 
 
 
 
