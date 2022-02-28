const utils = require('../utils/todos.utils');
const filepath = './resources/todos.txt';
const getTodos = async () => {
    try{
        const todos = await utils.promisifyReadFile(filepath);
        return todos.reduce((acc,item)=>{
        return acc + `${item}<br>`;
        },``);
    } catch (err) {
        throw err;
    }
}
const addTodo = async (data) => {
    try{
        const exisitingTodos = await utils.promisifyReadFile(filepath);
        const todoCount = exisitingTodos.length;    
        const todoData = `\r\n${todoCount + 1}|` + data;
        const addTodo = await utils.promisifyAppendFile(filepath,todoData);
        return addTodo;
    } catch(err) {
        throw err;
    }
}
module.exports = {
    getTodos,
    addTodo,
};

// ( async() =>{
//     console.log( await addTodos('Buy icecream'));
// })();