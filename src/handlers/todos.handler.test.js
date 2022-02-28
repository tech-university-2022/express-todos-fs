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
        expect(res.send).toHaveBeenCalledWith(`<h1>Todos:</h1><br>` + testTodos);
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
    it('should return total list of todos')
})