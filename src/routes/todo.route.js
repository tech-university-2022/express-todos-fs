const express = require('express');
const { postToDoHandler } = require('../handlers/postToDo.handler');
const { getToDoHandler } = require('../handlers/getToDo.handler');

const router = express.Router();
router.get('/', getToDoHandler);
router.post('/', postToDoHandler);

module.exports = {
  router,
};
