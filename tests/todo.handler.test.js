/* eslint-disable no-unused-vars */
const {
  // eslint-disable-next-line no-unused-vars
  getTodoHandler, postTodoHandler, putTodoHandler, deleteTodoHandler,
} = require('../src/handlers/todo.handler');
const services = require('../src/services/todo.services');

const testTodos = ['1|Take a break', '2|Make tea', '3|Buy 1kg rice', '4|Follow tdd daily', '5|Buy vegetables'];
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.set = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};
describe('getToDoHandler function', () => {
  it('should return Todos in a from server to client', async () => {
    jest.spyOn(services, 'readTodo').mockResolvedValue(testTodos);
    const res = mockResponse();
    await getTodoHandler(null, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(testTodos);
  });
  it('should return error message with its status code if error', async () => {
    jest.spyOn(services, 'readTodo').mockRejectedValue(new Error('Some error'));
    const res = mockResponse();
    try {
      await getTodoHandler(null, res);
    } catch (err) {
      expect(err.message).toBe('Some error');
    }
  });
});

describe('postToDoHandler function', () => {
  it('should return Todos in a from server to client', async () => {
    jest.spyOn(services, 'appendToDo').mockResolvedValue(testTodos);
    const res = mockResponse();
    await getTodoHandler(null, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(testTodos);
  });
  it('should return error message with its status code if error', async () => {
    jest.spyOn(services, 'appendToDo').mockRejectedValue(new Error('Some error'));
    const res = mockResponse();
    try {
      await getTodoHandler(null, res);
    } catch (err) {
      expect(err.message).toBe('Some error');
    }
  });
});
