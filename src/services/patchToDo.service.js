/* eslint-disable no-param-reassign */
const { getToDo } = require('./getToDo.services');
const { writeFile } = require('../utils/fileOperations.utils');

const convertToText = (newToDoList) => {
  let finalToDoString = '';
  newToDoList.forEach((eachToDo) => {
    if (finalToDoString.length !== 0) {
      finalToDoString += '\n';
    }
    finalToDoString += `${eachToDo.id}|${eachToDo.todo}`;
  });
  return finalToDoString;
};
const patchToDo = async (id, todo) => {
  if (typeof id !== 'string') {
    throw new Error('Invalid input type for id.');
  }
  if (typeof todo !== 'string') {
    throw new Error('Invalid input type for todo.');
  }
  const toDoList = await getToDo();
  const newToDoList = toDoList.map((givenTodo) => {
    if (givenTodo.id === id) {
      givenTodo.todo = todo;
    }
    return givenTodo;
  });
  await writeFile('C:\\Users\\Aishwarya S R\\-express-todos-fs\\resources\\todos.txt', convertToText(newToDoList));
  const updatedToDoList = getToDo();
  return Promise.resolve(updatedToDoList);
};

module.exports = {
  patchToDo,
};
