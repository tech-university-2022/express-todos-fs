/* eslint-disable no-useless-catch */
const fileOp = require('../utils/fileHandler');

const getTodosFromFile = async () => {
  try {
    let todosData = await fileOp.getDataFromFile();
    todosData = todosData.map((item) => item.split('|')).reduce((prevTodos, currArray) => {
      const todos = {
        id: currArray[0],
        todo: currArray[1],
      };
      prevTodos.push(todos);
      return prevTodos;
    }, []);
    return todosData;
  } catch (err) {
    throw err;
  }
};

const addTodosToFile = async (data) => {
  try {
    const currentTodos = await getTodosFromFile();
    let currentId = Number(currentTodos[currentTodos.length - 1].id);
    currentId += 1;
    const dataToBeAdded = `\r\n${currentId}|${data.todo}`;
    await fileOp.appendToFile(dataToBeAdded);
    currentTodos.push({
      id: currentId.toString(),
      todo: data.todo,
    });
    return currentTodos;
  } catch (err) {
    throw err;
  }
};
const updateTodoInFile = async (data) => {
  try {
    let currentTodos = await getTodosFromFile();
    currentTodos = currentTodos.map((currentObject) => {
      if (data.id === currentObject.id) {
        currentObject.todo = data.todo;
      }
      return currentObject;
    });
    currentTodos = currentTodos.reduce((prevContent, currentObject) => {
      prevContent += `${currentObject.id}|${currentObject.todo}\r\n`;
      return prevContent;
    }, '');
    const message = await fileOp.writeToFile(currentTodos);
    return message;
  } catch (err) {
    throw err;
  }
};
const deleteTodoFromFile = async (data) => {
  try {
    let currentTodos = await getTodosFromFile();
    currentTodos = currentTodos.filter((currentObject) => currentObject.id !== data.id);
    currentTodos = currentTodos.reduce((prevContent, currentObject) => {
      prevContent += `${currentObject.id}|${currentObject.todo}\r\n`;
      return prevContent;
    }, '');
    const message = await fileOp.writeToFile(currentTodos);
    return message;
  } catch (err) {
    throw err;
  }
};
module.exports = {
  getTodosFromFile,
  addTodosToFile,
  updateTodoInFile,
  deleteTodoFromFile,
};
