const { getToDo } = require('../services/getToDo.services');

const getToDoHandler = async (req, res) => {
  const toDoList = await getToDo();
  res.json({
    toDoList,
  }).status(200);
};

module.exports = {
  getToDoHandler,
};
