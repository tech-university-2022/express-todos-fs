const express = require('express');
const { getToDoHandler } = require('../handlers/getToDo.handler');

const getToDoRouter = express.Router();
getToDoRouter.get('/', getToDoHandler);

module.exports = {
  getToDoRouter,
};
