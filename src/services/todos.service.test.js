const services = require('./todos.service');
const utils = require('../utils/todos.utils');

const testArray = ['todo1','todo2','todo3'];
const newTodo = 'todo4';

describe('GetTodos Service function', () => {
    it('should return file contents in string format with linebreaks', async () => {
        jest.spyOn(utils,'promisifyReadFile').mockResolvedValue(testArray);
        expect(await services.getTodos()).toBe(testArray.join(`<br>`) + `<br>`);
    });
    it('should return error if there is a file reading error', async () => {
        jest.spyOn(utils,'promisifyReadFile').mockRejectedValue(new Error('Some error'));
        try{
            await services.getTodos();
        } catch(err) {
            expect(err.message).toBe('Some error');
        }
    });
});

describe('AddToDos Service function', () => {
    it('should return the total todo list after adding the new todo into file', async () => {
        jest.spyOn(utils,'promisifyReadFile').mockResolvedValue(testArray);
        jest.spyOn(utils,'promisifyAppendFile').mockResolvedValue([...testArray,newTodo]);
        expect(await services.addtoDo(newTodo)).toEqual([...testArray,newTodo]);
    });
    it('should return error if there is a file reading error', async () => {
        jest.spyOn(utils,'promisifyReadFile').mockRejectedValue(new Error('Some error'));
        try{
            await services.addtoDo(newTodo);
        } catch(err) {
            expect(err.message).toBe('Some error');
        }
    });
    it('should return error if there is a file appending error', async () => {
        jest.spyOn(utils,'promisifyReadFile').mockResolvedValue(testArray);
        jest.spyOn(utils,'promisifyAppendFile').mockRejectedValue(new Error('Some error'));
        try{
            await services.addtoDo(newTodo);
        } catch(err) {
            expect(err.message).toBe('Some error');
        }
    });
});