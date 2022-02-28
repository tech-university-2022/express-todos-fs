const { getTodoService, postTodoService } = require("../services/todo.service");

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
    const newTodo = req.body;
    try {
        await postTodoService(newTodo);
        getTodoHandler();
        //res.redirect('/todos');
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    getTodoHandler,
    postTodoHandler
}