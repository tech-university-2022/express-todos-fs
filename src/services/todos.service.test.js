const fileOp = require('../utils/fileHandler');
const operations = require('./todos.service');

describe('getTodosFromFile', () => {
  it('should give todo in form of json', async () => {
    const spy = jest.spyOn(fileOp, 'getDataFromFile').mockResolvedValue(['1|Take a break', '2|Make tea', '3|Buy 1kg rice', '4|Follow tdd daily', '5|Buy vegetables']);
    const output = await operations.getTodosFromFile();
    expect(output).toStrictEqual([{
      id: '1',
      todo: 'Take a break',
    }, {
      id: '2',
      todo: 'Make tea',
    }, {
      id: '3',
      todo: 'Buy 1kg rice',
    }, {
      id: '4',
      todo: 'Follow tdd daily',
    }, {
      id: '5',
      todo: 'Buy vegetables',
    }]);
    spy.mockRestore();
  });
  it('should give an error when wrong path provided', async () => {
    const spy = jest.spyOn(fileOp, 'getDataFromFile').mockRejectedValue(new Error('File cannot be opened.'));
    try {
      await operations.getTodosFromFile();
      spy.mockRestore();
    } catch (err) {
      spy.mockRestore();
      expect(err.message).toBe('File cannot be opened.');
    }
  });
});
describe('addTodoToFile', () => {
  it('should add and give all todos', async () => {
    const spy = jest.spyOn(fileOp, 'appendToFile').mockResolvedValue('Data added successfully');
    const output = await operations.addTodosToFile({ todo: 'add new todo' });
    const finalOutput = [{
      id: '1',
      todo: 'Take a break',
    }, {
      id: '2',
      todo: 'Make tea',
    }, {
      id: '3',
      todo: 'Buy 1kg rice',
    }, {
      id: '4',
      todo: 'Follow tdd daily',
    }, {
      id: '5',
      todo: 'Buy vegetables',
    }, {
      id: '6',
      todo: 'add new todo',
    }];
    expect(output).toStrictEqual(finalOutput);
    spy.mockRestore();
  });
  it('should throw an error if not able to append data', async () => {
    const spy = jest.spyOn(fileOp, 'appendToFile').mockRejectedValue(new Error('Data could not be written'));
    try {
      await operations.addTodosToFile({ todo: 'add new todo' });
      spy.mockRestore();
    } catch (err) {
      spy.mockRestore();
      expect(err.message).toBe('Data could not be written');
    }
  });
});
describe('updataTodoInFile', () => {
  it('should give success message when updated', async () => {
    jest.spyOn(fileOp, 'writeToFile').mockResolvedValue('Data written successfully');
    const message = await operations.updateTodoInFile({ id: '5', todo: 'updated' });
    expect(message).toBe('Data written successfully');
  });
  it('should give error message when not able to update', async () => {
    jest.spyOn(fileOp, 'writeToFile').mockRejectedValue(new Error('Data could not be written'));
    try {
      await operations.updateTodoInFile({ id: '5', todo: 'updated' });
    } catch (err) {
      expect(err.message).toBe('Data could not be written');
    }
  });
});
describe('deleteTodoFromFile', () => {
  it('should give success message when todo is deleted', async () => {
    const spy = jest.spyOn(fileOp, 'writeToFile').mockResolvedValue('Data written successfully');
    const message = await operations.deleteTodoFromFile({ id: '5' });
    expect(message).toBe('Data written successfully');
    spy.mockRestore();
  });
  it('should give error message when not able to update', async () => {
    const spy = jest.spyOn(fileOp, 'writeToFile').mockRejectedValue(new Error('Data could not be written'));
    try {
      await operations.deleteTodoFromFile({ id: '5' });
    } catch (err) {
      spy.mockRestore();
      expect(err.message).toBe('Data could not be written');
    }
  });
});
