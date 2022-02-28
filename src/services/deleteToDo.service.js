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
const deleteToDo = async (id) => {
  if (typeof id !== 'string') {
    throw new Error('Invalid input type for id.');
  }
  const toDoList = await getToDo();
  const newToDoList = toDoList.filter((givenTodo) => (givenTodo.id !== id));
  await writeFile('C:\\Users\\Aishwarya S R\\-express-todos-fs\\resources\\todos.txt', convertToText(newToDoList));
  const updatedToDoList = getToDo();
  return Promise.resolve(updatedToDoList);
};

module.exports = {
  deleteToDo,
};
