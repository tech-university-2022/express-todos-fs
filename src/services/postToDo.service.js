const { getToDo } = require('./getToDo.services');
const { appendFile } = require('../utils/fileOperations.utils');

const getNextId = async () => {
  const todos = await getToDo();
  return (todos.length + 1);
};

const postToDo = async (todo) => {
  if (typeof todo !== 'string') {
    throw new Error('Invalid input type for todo.');
  }
  const id = await getNextId();
  const nextToDo = `\n${id}|${todo}`;
  await appendFile('C:\\Users\\Aishwarya S R\\-express-todos-fs\\resources\\todos.txt', nextToDo);
  const toDoList = getToDo();
  return Promise.resolve(toDoList);
};

module.exports = {
  postToDo,
};
