const utils = require('../utils/todos.utils');
const filepath = './resources/todos.txt';
const todoErrors = require('../errors/todos.errors');
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
    if(!data) throw todoErrors.InputError('InputError','Invalid input!',400);
    if(typeof data !== 'string') throw todoErrors.InputError('InputError','Invalid input!',400);
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