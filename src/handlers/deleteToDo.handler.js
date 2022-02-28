const { deleteToDo } = require('../services/deleteToDo.service');

const deleteToDoHandler = async (req, res) => {
  const { id } = req.body;
  const toDoList = await deleteToDo(id);
  res.json({
    toDoList,
  }).status(200);
};

module.exports = {
  deleteToDoHandler,
};
