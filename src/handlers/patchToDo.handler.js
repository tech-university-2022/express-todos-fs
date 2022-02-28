const { patchToDo } = require('../services/patchToDo.service');

const patchToDoHandler = async (req, res) => {
  const { id, todo } = req.body;
  const toDoList = await patchToDo(id, todo);
  res.json({
    toDoList,
  }).status(200);
};

module.exports = {
  patchToDoHandler,
};
