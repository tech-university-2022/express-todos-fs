const { readFile } = require('../utils/fileOperations.utils');

const getToDo = async () => {
  // let fullToDoList = await readFile('../../resources/todos.txt');
  let fullToDoList = await readFile('C:\\Users\\Aishwarya S R\\-express-todos-fs\\resources\\todos.txt');
  fullToDoList = fullToDoList.replace(/(\r)/g, '');
  fullToDoList = fullToDoList.split('\n');
  const fullToDoInObjects = [];
  fullToDoList.forEach((todoBeforeSplit) => {
    const todoAfterSplit = todoBeforeSplit.split('|');
    const [id, todo] = todoAfterSplit;
    fullToDoInObjects.push({ id, todo });
  });
  return Promise.resolve(fullToDoInObjects);
};

module.exports = {
  getToDo,
};
