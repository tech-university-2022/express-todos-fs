const fs = require('fs');
const {
  promisifyReadFile, promisifyAppendFile, removeFromFile,
} = require('../src/utils/todo.fs.utils');

describe('PromisifyReadFile function', () => {
  it('should read and display the data in a file in array format', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation((filepath, callback) => {
      callback(null, '1|Take a break\r\n2|Make tea\r\n3|Buy 1kg rice\r\n4|Follow tdd daily\r\n5|Buy vegetables');
    });
    const toDo = promisifyReadFile('../resources/todos.txt');
    return expect(toDo).resolves.toStrictEqual(['1|Take a break', '2|Make tea', '3|Buy 1kg rice', '4|Follow tdd daily', '5|Buy vegetables']);
  });
  it('should return invalid message if file is not found', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation((filepath, callback) => {
      callback(new Error('File cannot be found!'), null);
    });
    try {
      await promisifyReadFile('file.txt');
    } catch (err) {
      expect(err.message).toBe('File cannot be found!');
    }
  });
  it('should return invalid message if input is not a string', async () => {
    try {
      await promisifyReadFile(5);
    } catch (err) {
      expect(err.message).toBe('Invalid filepath!');
    }
  });
});
describe('PromisifyAppendFile function', () => {
  it('should write into a new line of the file and return file contents in array', async () => {
    jest.spyOn(fs, 'appendFile').mockImplementation((filePath, content, errorCallback) => {
      errorCallback(null);
    });
    jest.spyOn(fs, 'readFile').mockImplementation((filePath, callback) => {
      callback(null, ['1|Take a break\r\n2|Make tea\r\n3|Buy 1kg rice\r\n4|Follow tdd daily\r\n5|Buy vegetables\r\n6|Wash Clothes']);
    });
    const writefilePromise = await promisifyAppendFile('../resources/todos.txt', '\r\nWash Clothes');
    expect(writefilePromise).toStrictEqual(['1|Take a break', '2|Make tea', '3|Buy 1kg rice', '4|Follow tdd daily', '5|Buy vegetables', '6|Wash Clothes']);
  });
  it('should return invalid message if file is not found', async () => {
    jest.spyOn(fs, 'appendFile').mockImplementation((filePath, content, errorCallback) => {
      errorCallback('Cannot append to the file!');
    });
    try {
      await promisifyAppendFile('seed', 'exampledata');
    } catch (err) {
      expect(err.message).toBe('Cannot append to file!');
    }
  });
  it('should return invalid message if file path is not string', async () => {
    try {
      await promisifyAppendFile(5);
    } catch (err) {
      expect(err.message).toBe('Invalid, enter a proper filepath!');
    }
  });
  it('should return invalid message if data is not a string buffer', async () => {
    try {
      await promisifyAppendFile('../resources/todos.txt', 5);
    } catch (err) {
      expect(err.message).toBe('Invalid, enter string buffer data!');
    }
  });
});

describe('RemoveFromFile function', () => {
  it('should filter content from file and return the modified file contents in an array', async () => {
    jest.spyOn(fs, 'writeFile').mockImplementation((filePath, content, errorCallback) => {
      errorCallback(null);
    });
    jest.spyOn(fs, 'readFile').mockImplementation((filePath, callback) => {
      callback(null, ['mango\r\nbanana\r\norange\r\napple\r\nstrawberry\r\npeach']);
    });
    const fruitsWithoutB = await removeFromFile('./seed/fruits.txt', 'b');
    expect(fruitsWithoutB).toEqual(['mango', 'banana', 'orange', 'apple', 'strawberry', 'peach']);
  });
  it('should return invalid message if file is not found', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation((filePath, callback) => {
      callback(new Error('Cannot find file!'), null);
    });
    try {
      await removeFromFile('seed', 'c');
    } catch (err) {
      expect(err.message).toBe('Cannot find file!');
    }
  });
  it('should return invalid message if filePath is not string', async () => {
    try {
      await removeFromFile(5);
    } catch (err) {
      expect(err.message).toBe('Filepath not a string');
    }
  });
  it('should return invalid message if filter character not given', async () => {
    try {
      await removeFromFile('somedirectory');
    } catch (err) {
      expect(err.message).toBe('Filter character not a string');
    }
  });
  it('should return invalid message if filter character is not string', async () => {
    try {
      await removeFromFile('somedirectory', 5);
    } catch (err) {
      expect(err.message).toBe('Filter character not a string');
    }
  });
});
