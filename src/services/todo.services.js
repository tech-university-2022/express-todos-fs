const {
  // eslint-disable-next-line no-unused-vars
  promisifyAppendFile, promisifyReadFile, promisifyWriteFile, removeFromFile,
} = require('../utils/todo.fs.utils');

const readTodo = async (filepath) => {
  try {
    // console.log(filepath);
    const fileContent = await promisifyReadFile(filepath);
    return fileContent;
  } catch (err) {
    throw new Error('Error is data retrieval!');
  }
};
const appendToDo = async (filepath, data) => {
  try {
    // console.log(filepath);
    const fileContent = await promisifyAppendFile(filepath, data);
    return fileContent;
  } catch (err) {
    throw new Error('Error is data retrieval!');
  }
};
const writeToDo = async (filepath, data) => {
  try {
    // console.log(filepath);
    const fileContent = await promisifyWriteFile(filepath, data);
    return fileContent;
  } catch (err) {
    throw new Error('Error is data retrieval!');
  }
};
const deleteToDo = async (filepath, todoIndex) => {
  try {
    const fileContent = await removeFromFile(filepath, todoIndex);
    return fileContent;
  } catch (err) {
    throw new Error('Error is data retrieval!');
  }
};
const cleanToDo = async (filepath) => {
  try {
    let fileContent = await promisifyReadFile(filepath);
    fileContent = fileContent.filter((todo) => (todo !== '\r\n'));
    return fileContent;
  } catch (err) {
    throw new Error('Error is data retrieval!');
  }
};
module.exports = {
  readTodo, appendToDo, writeToDo, deleteToDo, cleanToDo,
};
