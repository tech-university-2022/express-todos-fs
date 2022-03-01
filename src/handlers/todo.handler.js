const todoServices = require('../services/todos.service')

const listTodoHandler = async (req,res)=>{
    const listOfTodo = await todoServices.listTodos()
    res.json({
        listOfTodo
      }).status(200);
}

const addTodoHandler  = async (req,res)=>{
    const todo = req.body.todoTask
    const data = await todoServices.addTodo(todo)
    res.send(data);
}

const updateTodoHandler = async (req,res) =>{
    const todo = req.body.todoTask
    console.log(todo)
    const id = req.params.id
    const data = await todoServices.updateTodo(id,todo);
    res.send(data)
}

const deletedTodoHandler = async(req,res) =>{
    const id = req.params.id;
    await todoServices.deleteTodoTask(id);
    res.json({
        message:`${id} has been deleted`
    }).status(200);
}

module.exports={
    listTodoHandler,
    addTodoHandler,
    updateTodoHandler,
    deletedTodoHandler
}