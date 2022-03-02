const utils = require('../utils/fs.utils');
const filePath = 'resources/todos.txt'

const getTodos = async () => {
  const data = await utils.promisfyReadFiles(filePath);
  return data;
};

const addTodo = async (todo) => {
  const index = ((await utils.promisfyReadFiles(filePath)).length + 1).toString();
  const newData = `\r\n${index}|${todo}`;
 
  await utils.promisfyAppendData(filePath, newData);
  const data = await utils.promisfyReadFiles(filePath);
  return data;
};

const modifyTodo = async (id, todo) => {
  const data = await utils.promisfyReadFiles(filePath);
  data.splice((parseInt(id) - 1), 1, `${id}|${todo}`);
  await utils.promisfyRemoveData(filePath, data);
};

const deleteTodo = async (id) => {
  const data = await utils.promisfyReadFiles(filePath);
  data.splice((parseInt(id) - 1), 1);
  const modifiedData = data.map((element, index) => {
    if (index >= (parseInt(id) - 1)) {
      element = `${(index + 1).toString()}|${element.split('|')[1]}`;
    }
    return element;
  });
  await utils.promisfyRemoveData(filePath, modifiedData);
};
module.exports = {
  getTodos,
  addTodo,
  modifyTodo,
  deleteTodo,
};