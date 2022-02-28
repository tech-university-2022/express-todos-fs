const todoService = require('../services/todos.service');
// const utils = require('../utils/todos.utils');

const getTodosHandler = async (req, res) => {
    res.set('Content-Type', 'text/html');
    try{
        const todos = await todoService.getTodos();
        if(!todos) res.status(200).send('No todos found! :(');
        else res.status(200).send(`<h1>Todos:</h1><br>` + todos);
    } catch(err) {
        res.status(500).send(err.message);
    }    
}
const addTodoHandler = async(req, res) => {
    const todoData = req.body;
    try{
        const addTodo = await todoService.addTodo(todoData);
        res.status(200).send('New todo Added!');
        await getTodosHandler(req,res);
    } catch(err) {
        res.status(500).send(err.message);
    }
}
module.exports = {
    getTodosHandler,
    addTodoHandler,
};