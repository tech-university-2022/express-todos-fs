const fs = require('fs');
const utilsRead = require('../todos.utils.read');
const utils = require('../todos.utils');
const todoErrors = require('../../errors/todos.errors');

describe('PromisifyAppendFile function', () => {
    it('should write into a new line of the file and return file contents in array', async () => {
      jest.spyOn(fs, 'appendFile').mockImplementation((filepath, data, errorCallback) => {
        errorCallback(null);
      });
      jest.spyOn(utilsRead, 'promisifyReadFile').mockResolvedValue(['todo1','todo2','todo3']);
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
    it('should write into a new line of the file and return file contents in array', async () => {
      jest.spyOn(utilsRead, 'promisifyReadFile').mockResolvedValue(['todo1','todo2','todo3']);
      expect(await utils.promisifyWriteFile(' ','todo3')).toEqual(['todo1','todo2','todo3']);
    });
    it('should return invalid message if file is not found', async () => {
      jest.spyOn(fs, 'appendFile').mockImplementation((filePath, content, errorCallback) => {
        errorCallback(new todoErrors.InputError('InputError','Cannot write into file \'seed\'!',400));
      });
      try {
        await utils.promisifyWriteFile('seed', 'exampledata');
      } catch (err) {
        expect(err.message).toBe('Cannot write into file \'seed\'!');
      }
    });
    it('should return invalid message if file path is not string', async () => {
      try {
        await utils.promisifyWriteFile(5);
      } catch (err) {
        expect(err.message).toBe('Invalid, enter a proper filepath!');
      }
    });
    it('should return invalid message if no data is given to write', async () => {
      try {
        await utils.promisifyWriteFile('./resources/todos.txt');
      } catch (err) {
        expect(err.message).toBe('Invalid, Enter data to write!');
      }
    });
    it('should return invalid message if data is not a string buffer', async () => {
      try {
        await utils.promisifyWriteFile('./resources/todos.txt', 5);
      } catch (err) {
        expect(err.message).toBe('Invalid, enter string buffer data!');
      }
    });
 }); 
  