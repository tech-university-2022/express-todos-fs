const req = require("express/lib/request");
const { getTodoService, postTodoService, updateTodoService, deleteTodoService } = require("../services/todo.service");

const getTodoHandler = async (req, res) => {
    try {
        const todos = await getTodoService();
        if (!todos) res.status(200).send('No todos available');
        else res.status(200).json(todos);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

const postTodoHandler = async (req, res) => {
    const newTodo = req.body.todoTask;
    try {
        await postTodoService(newTodo);
        getTodoHandler(null, res);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const updateTodoHandler = async (req, res) => {
    const id = req.params.id;
    const changedTodo = req.body.todoTask;
    console.log(`from updateTodoHandler ${changedTodo}`);
    try {
        await updateTodoService(id,changedTodo);
        getTodoHandler(null, res);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const deleteTodoHandler = async (req, res) => {
    const id = req.params.id;
    try {
        await deleteTodoService(id);
        res.json({
            message:`${id} has been deleted`
        }).status(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    getTodoHandler,
    postTodoHandler,
    updateTodoHandler,
    deleteTodoHandler
}