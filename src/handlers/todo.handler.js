const {
  readTodo, appendToDo, writeToDo, deleteToDo, cleanToDo,
} = require('../services/todo.services');

const getTodoHandler = async (req, res) => {
  res.set('Content-Type', 'text/html');
  const todoContent = await readTodo('./resources/todos.txt');
  res.status(200).send(todoContent);
};
const postTodoHandler = async (req, res) => {
  console.log(req.body);
  const todoContent = await readTodo('./resources/todos.txt');
  const todoIndex = todoContent.length + 1;
  const newEntry = `\r\n${todoIndex}|${req.body.todo}`;
  const appendedToDo = await appendToDo('./resources/todos.txt', newEntry);
  res.set('Content-Type', 'text/html');
  res.status(200).send(appendedToDo);
};
const putTodoHandler = async (req, res) => {
  const todoIndex = req.params.index;
  console.log(req.body);
  const todoContent = await readTodo('./resources/todos.txt');
  todoContent[todoIndex - 1] = `\r\n${todoIndex}|${req.body.todo}`;
  const newToDo = todoContent.join('\r\n');
  const modifiedToDo = await writeToDo('./resources/todos.txt', newToDo);
  res.set('Content-Type', 'text/html');
  res.status(200).send(modifiedToDo);
};
const deleteTodoHandler = async (req, res) => {
  const todoIndex = req.params.index;
  console.log(req.body);
  let modifiedToDo = await deleteToDo('./resources/todos.txt', todoIndex.toString());
  modifiedToDo = await cleanToDo('./resources/todos.txt');
  res.set('Content-Type', 'text/html');
  res.status(200).send(modifiedToDo);
};
module.exports = {
  getTodoHandler,
  postTodoHandler,
  putTodoHandler,
  deleteTodoHandler,
};
