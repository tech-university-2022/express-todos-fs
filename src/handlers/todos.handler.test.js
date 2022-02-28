const { InputError } = require('../errors/todos.errors');
const todoService =  require('../services/todos.service');
const handlers = require('./todos.handler');
const testTodos = `1|todo1<br>2|todo2<br>3|todo3<br>`;

const mockResponse = () => {
    const res = {};
    res.set = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};
describe('GetTodosHandler function', () => {
    it('should return Todos in a string as html list with status 200', async() => {
        jest.spyOn(todoService,'getTodos').mockResolvedValue(testTodos);
        const res = mockResponse();
        await handlers.getTodosHandler(null,res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(`<h2>Your To-Do List:</h2><br>` + testTodos);
    });
    it('should return message if no todos found', async () => {
        jest.spyOn(todoService,'getTodos').mockResolvedValue(null);
        const res = mockResponse();
        await handlers.getTodosHandler(null,res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('No todos found! :(');
    });
    it('should return error message with its status code if error', async() => {
        jest.spyOn(todoService,'getTodos').mockRejectedValue(new Error('Some error'));
        const res = mockResponse();
        try{
            await handlers.getTodosHandler(null,res);
        } catch(err) {
            expect(err.message).toBe('Some error');
        }
    });
});
describe('AddToDoHandler function', () => {
    it('should return total list of todos after inserting', async () => {
        jest.spyOn(todoService,'addTodo').mockResolvedValue(testTodos);
        jest.spyOn(todoService,'getTodos').mockImplementation(() => {});
        const res = mockResponse();
        const req = {body: 'new todo'};
        await handlers.addTodoHandler(req,res);
        expect(todoService.getTodos).toHaveBeenCalled();
    });
    it('should return error with status code if some input or server error', async () => {
        jest.spyOn(todoService,'addTodo').mockRejectedValue(new InputError('InputError','Invalid input!',400));
        const res = mockResponse();
        const req = {body: 'new todo'};
        try{
            await handlers.addTodoHandler(req,res);
        } catch(err) {
            if(err instanceof InputError) expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(err.mesage);
        }
    });
});
describe('ChangeToDoHandler function', () => {
    it('should return modified list of todos after changing', async () => {
        jest.spyOn(todoService,'changeTodo').mockResolvedValue(testTodos);
        jest.spyOn(todoService,'getTodos').mockImplementation(() => {});
        const res = mockResponse();
        const req = {body: {'todo':'new todo', 'id':2}};
        await handlers.changeTodoHandler(req,res);
        expect(todoService.getTodos).toHaveBeenCalled();
    });
    it('should return error with status code if some input or server error', async () => {
        jest.spyOn(todoService,'changeTodo').mockRejectedValue(new InputError('InputError','Invalid input!',400));
        const res = mockResponse();
        const req = {body: {'todo':'new todo', 'id':2}};
        try{
            await handlers.changeTodoHandler(req,res);
        } catch(err) {
            if(err instanceof InputError) expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(err.mesage);
        }
    });
});
describe('RemoveTodoHandler function', () => {
    it('should return modified list of todos after changing', async () => {
        jest.spyOn(todoService,'removeTodo').mockResolvedValue(testTodos);
        jest.spyOn(todoService,'getTodos').mockImplementation(() => {});
        const res = mockResponse();
        const req = {body: {'id':2}};
        await handlers.removeTodoHandler(req,res);
        expect(todoService.getTodos).toHaveBeenCalled();
    });
    it('should return error with status code if some input or server error', async () => {
        jest.spyOn(todoService,'changeTodo').mockRejectedValue(new InputError('InputError','Invalid input!',400));
        const res = mockResponse();
        const req = {body: {'id':2}};
        try{
            await handlers.removeTodoHandler(req,res);
        } catch(err) {
            if(err instanceof InputError) expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(err.mesage);
        }
    });
});