const services = require('../services/todo.services');

const todoReadHandler = async (req, res) => {
  const todos = await services.promisifyReadFile('resources/todo.txt');
  res.json({
    message: todos,
  }).status(200);
};
const todoAppendHandler = async (req, res) => {
  // res.json({ message: 'hi' }).status(200);
  // console.log(`request body${req.body}`);
  const todos = await services.appendFile('resources/todo.txt', req.body);
  res.json({
    message: todos,
  }).status(200);
};
const todoUpdateHandler = async (req, res) => {
  const todos = await services.updateFile('resources/todo.txt', req.body, req.params.index);
  res.json({
    message: todos,
  }).status(200);
};
const todoDeleteHandler = async (req, res) => {
  const todos = await services.deleteFile(req.params.index);
  res.json({
    message: todos,
  }).status(200);
};
module.exports = {
  todoReadHandler,
  todoAppendHandler,
  todoUpdateHandler,
  todoDeleteHandler,
};
