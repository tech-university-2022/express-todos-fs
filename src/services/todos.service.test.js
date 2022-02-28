const services = require('./todos.service');
const utilsRead = require('../utils/todos.utils.read');
const utils = require('../utils/todos.utils');
const moreUtils = require('../utils/todos.moreUtils');
const { InputError } = require('../errors/todos.errors');

const testArray = ['todo1','todo2','todo3'];
const newTodo = 'todo4';

describe('GetTodos Service function', () => {
    it('should return file contents in string format with linebreaks', async () => {
        jest.spyOn(utilsRead,'promisifyReadFile').mockResolvedValue(testArray);
        expect(await services.getTodos()).toBe(testArray.join(`<br>`) + `<br>`);
    });
    it('should return error if there is a file reading error', async () => {
        jest.spyOn(utilsRead,'promisifyReadFile').mockRejectedValue(new Error('Some error'));
        try{
            await services.getTodos();
        } catch(err) {
            expect(err.message).toBe('Some error');
        }
    });
});

describe('AddToDos Service function', () => {
    it('should return the total todo list after adding the new todo into file', async () => {
        jest.spyOn(utilsRead,'promisifyReadFile').mockResolvedValue(testArray);
        jest.spyOn(utils,'promisifyAppendFile').mockResolvedValue([...testArray,newTodo]);
        expect(await services.addTodo(newTodo)).toEqual([...testArray,newTodo]);
    });
    it('should retrun error if todo is not a string', async () => {
        try{
            await services.addTodo(7);
        } catch(err) {
            if(err instanceof InputError)expect(err.message).toBe('Invalid input!');
        }
    });
    it('should retrun error if new todo not given', async () => {
        try{
            await services.addTodo();
        } catch(err) {
            if(err instanceof InputError)expect(err.message).toBe('Invalid input!');
        }
    });
    it('should return error if there is a file reading error', async () => {
        jest.spyOn(utilsRead,'promisifyReadFile').mockRejectedValue(new Error('Some error'));
        try{
            await services.addTodo(newTodo);
        } catch(err) {
            expect(err.message).toBe('Some error');
        }
    });
    it('should return error if there is a file appending error', async () => {
        jest.spyOn(utilsRead,'promisifyReadFile').mockResolvedValue(testArray);
        jest.spyOn(utils,'promisifyAppendFile').mockRejectedValue(new Error('Some error'));
        try{
            await services.addTodo(newTodo);
        } catch(err) {
            expect(err.message).toBe('Some error');
        }
    });
});
describe('ChangeToDos Service function', () => {
    it('should return the modified todo list after changing content', async () => {
        jest.spyOn(moreUtils,'editFile').mockResolvedValue(['1|todo1','2|todo4','3|todo3']);
        expect(await services.changeTodo(2,'todo4')).toEqual(['1|todo1','2|todo4','3|todo3']);
    });
    it('should return error if input ID is invalid', async () => {
        try{
            await services.changeTodo(-1,'new todo');
        } catch(err) {
            expect(err.message).toBe('Invalid, enter proper todo ID!');
        }
    });
    it('should return error if input ID is not number', async () => {
        try{
            await services.changeTodo('example','new todo');
        } catch(err) {
            expect(err.message).toBe('Invalid, enter proper todo ID!');
        }
    });
    it('should return error if data is not given', async () => {
        try{
            await services.changeTodo(1);
        } catch(err) {
            expect(err.message).toBe('Invalid, enter replacement data!');
        }
    });
    it('should return error if Todo Id is not given', async () => {
        try{
            await services.changeTodo();
        } catch(err) {
            expect(err.message).toBe('Invalid, enter proper todo ID!');
        }
    });
    it('should return error if util function malfunctions', async () => {
        jest.spyOn(moreUtils,'editFile').mockRejectedValue(new Error('Some error'));
        try{
            await services.changeTodo(1,'new todo');
        } catch(err) {
            expect(err.message).toBe('Some error');
        }
    });
});