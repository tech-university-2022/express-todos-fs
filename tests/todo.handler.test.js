const {
  // eslint-disable-next-line no-unused-vars
  getTodoHandler, postTodoHandler, putTodoHandler, deleteTodoHandler,
} = require('../src/handlers/todo.handler');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
describe('getToDoHandler function', () => {
  test('should send todo list present at server to client side', async () => {
    const req = {};
    const res = mockResponse();
    await getTodoHandler(req, res);
    expect(res.json).toHaveBeenCalledWith(['1|Take a break', '2|Make tea', '3|Buy 1kg rice', '4|Follow tdd daily', '5|Buy vegetables']);
  });
  test('should give error if data cannot be retrieved', async () => {
    try {
      const req = {};
      const res = mockResponse();
      await getTodoHandler(req, res);
    } catch (err) {
      expect(err.message).toBe('Data cannot be retrieved');
    }
  });
});
