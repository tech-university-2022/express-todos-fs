const { postToDo } = require('../services/postToDo.service');

const postToDoHandler = async (req, res) => {
  const { todo } = req.body;
  const toDoList = await postToDo(todo);
  res.json({
    toDoList,
  }).status(200);
};

module.exports = {
  postToDoHandler,
};
