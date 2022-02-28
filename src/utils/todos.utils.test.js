const fs = require('fs');
const utils = require('../utils/todos.utils');
const todoErrors = require('../errors/todos.errors');

describe('PromisifyReadFile function', () => {
    it('should read and display the data in a file in array format', async () => {
      jest.spyOn(fs, 'readFile').mockImplementation((filepath, callback) => {
        callback(null, 'mango\r\nbanana\r\norange\r\napple');
      });
      const data = utils.promisifyReadFile('file.txt');
      return expect(data).resolves.toStrictEqual(['mango','banana','orange', 'apple']);
    });
    it('should return invalid message if file is not found', async () => {
      jest.spyOn(fs, 'readFile').mockImplementation((filepath, callback) => {
        callback(new Error('File cannot be found!'), null);
      });
      try {
        await utils.promisifyReadFile('file.txt');
      } catch (err) {
        expect(err.message).toBe('File cannot be found!');
      }
    });
    it('should return invalid message if input is not a string', async () => {
      try {
        await utils.promisifyReadFile(5);
      } catch (err) {
        expect(err.message).toBe('Invalid, enter a proper filepath!');
      }
    });
});
describe('PromisifyReadDir function', () => {
    it('should read files name into an array', async () => {
      jest.spyOn(fs, 'readdir').mockImplementation((directoryPath, callback) => {
        callback(null, ['todos.txt']);
      });
      const files = await utils.promisifyReadDir('anydir');
      expect(files).toStrictEqual(['todos.txt']);
    });
    it('should return invalid message if directory not found', async () => {
      jest.spyOn(fs, 'readdir').mockImplementation((directoryPath, callback) => {
        callback(new Error('Directory not found!'), null);
      });
      try {
        await utils.promisifyReadDir('dir');
      } catch (err) {
        expect(err.message).toBe('Directory not found!');
      }
    });
    it('should return invalid message if input is not a string', async () => {
      try {
        await utils.promisifyReadDir(5);
      } catch (err) {
        expect(err.message).toBe('Invalid, enter a proper Directory Path!');
      }
    });
});

describe.only('PromisifyAppendFile function', () => {
  it.only('should write into a new line of the file and return file contents in array', async () => {
    jest.spyOn(fs, 'appendFile').mockImplementation((filepath, data, errorCallback) => {
      errorCallback(null);
    });
    jest.spyOn(utils, 'promisifyReadFile').mockResolvedValue(['todo1','todo2','todo3']);
    expect(await utils.promisifyAppendFile(' ','todo3')).toEqual(['todo1','todo2','todo3']);
  });
  it('should return invalid message if file is not found', async () => {
    jest.spyOn(fs, 'appendFile').mockImplementation((filePath, content, errorCallback) => {
      errorCallback(new todoErrors.InputError('InputError','Cannot write into file \'seed\'!',400));
    });
    try {
      await utils.promisifyAppendFile('seed', 'exampledata');
    } catch (err) {
      expect(err.message).toBe('Cannot write into file \'seed\'!');
    }
  });
  it('should return invalid message if file path is not string', async () => {
    try {
      await utils.promisifyAppendFile(5);
    } catch (err) {
      expect(err.message).toBe('Invalid, enter a proper filepath!');
    }
  });
  it('should return invalid message if no data is given to write', async () => {
    try {
      await utils.promisifyAppendFile('./resources/todos.txt');
    } catch (err) {
      expect(err.message).toBe('Invalid, Enter data to write!');
    }
  });
  it('should return invalid message if data is not a string buffer', async () => {
    try {
      await utils.promisifyAppendFile('./resources/todos.txt', 5);
    } catch (err) {
      expect(err.message).toBe('Invalid, enter string buffer data!');
    }
  });
}); 
describe('PromisifyWriteFile function', () => {
  // it('should write into a new line of the file and return file contents in array', async () => {
  //   jest.spyOn(fs, 'appendFile').mockImplementation((filepath, data, errorCallback) => {
  //     errorCallback(null);
  //   });
  //   jest.spyOn(utils, 'promisifyReadFile').mockResolvedValue(['todo1','todo2','todo3']);
  //   expect(await utils.promisifyAppendFile(' ','todo3')).toEqual(['todo1','todo2','todo3']);
  // });
  it('should return invalid message if file is not found', async () => {
    jest.spyOn(fs, 'appendFile').mockImplementation((filePath, content, errorCallback) => {
      errorCallback(new todoErrors.InputError('InputError','Cannot write into file \'seed\'!',400));
    });
    try {
      await utils.promisifyAppendFile('seed', 'exampledata');
    } catch (err) {
      expect(err.message).toBe('Cannot write into file \'seed\'!');
    }
  });
  it('should return invalid message if file path is not string', async () => {
    try {
      await utils.promisifyAppendFile(5);
    } catch (err) {
      expect(err.message).toBe('Invalid, enter a proper filepath!');
    }
  });
  it('should return invalid message if no data is given to write', async () => {
    try {
      await utils.promisifyAppendFile('./resources/todos.txt');
    } catch (err) {
      expect(err.message).toBe('Invalid, Enter data to write!');
    }
  });
  it('should return invalid message if data is not a string buffer', async () => {
    try {
      await utils.promisifyAppendFile('./resources/todos.txt', 5);
    } catch (err) {
      expect(err.message).toBe('Invalid, enter string buffer data!');
    }
  });
}); 

// describe('EditFile Function', () => {
//   it('should return ')
// })