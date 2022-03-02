const {
    getTodos,
    addTodo,
    modifyTodo,
    deleteTodo,
  } = require("../services/todo.service");
  
  const getTodosHandler = async (req, res) => {
    const data = await getTodos();
    res.write("Todo List-\n");
    data.forEach((element) => {
      res.write(element);
      res.write("\n");
    });
    res.end();
  };
  
  const addTodoHandler = async (req, res) => {
    
    const data = await addTodo(req.body.todo);
    res.send(data);
  };
  
  const modifyTodoHandler = async (req, res) => {
    await modifyTodo(req.params.id, req.body.todo);
    res.send("Todo changed successfully");
  };
  
  const deleteTodoHandler = async (req, res) => {
    await deleteTodo(req.params.id);
    res.send("Todo deleted");
  };
  
  module.exports = {
    getTodosHandler,
    addTodoHandler,
    modifyTodoHandler,
    deleteTodoHandler,
  };