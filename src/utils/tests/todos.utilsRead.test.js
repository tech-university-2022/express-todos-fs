const fs = require('fs');
const utilsRead = require('../todos.utils.read');
const todoErrors = require('../../errors/todos.errors');

describe('PromisifyReadFile function', () => {
    it('should read and display the data in a file in array format', async () => {
      jest.spyOn(fs, 'readFile').mockImplementation((filepath, callback) => {
        callback(null, 'mango\r\nbanana\r\norange\r\napple');
      });
      const data = utilsRead.promisifyReadFile('file.txt');
      return expect(data).resolves.toStrictEqual(['mango','banana','orange', 'apple']);
    });
    it('should return invalid message if file is not found', async () => {
      jest.spyOn(fs, 'readFile').mockImplementation((filepath, callback) => {
        callback(new Error('File cannot be found!'), null);
      });
      try {
        await utilsRead.promisifyReadFile('file.txt');
      } catch (err) {
        expect(err.message).toBe('File cannot be found!');
      }
    });
    it('should return invalid message if input is not a string', async () => {
      try {
        await utilsRead.promisifyReadFile(5);
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
      const files = await utilsRead.promisifyReadDir('anydir');
      expect(files).toStrictEqual(['todos.txt']);
    });
    it('should return invalid message if directory not found', async () => {
      jest.spyOn(fs, 'readdir').mockImplementation((directoryPath, callback) => {
        callback(new Error('Directory not found!'), null);
      });
      try {
        await utilsRead.promisifyReadDir('dir');
      } catch (err) {
        expect(err.message).toBe('Directory not found!');
      }
    });
    it('should return invalid message if input is not a string', async () => {
      try {
        await utilsRead.promisifyReadDir(5);
      } catch (err) {
        expect(err.message).toBe('Invalid, enter a proper Directory Path!');
      }
    });
});
