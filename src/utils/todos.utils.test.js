const fs = require('fs');
const utils = require('../utils/todos.utils');

describe('PromisifyReadFile function', () => {
    it('should read and display the data in a file in array format', async () => {
      jest.spyOn(fs, 'readFile').mockImplementation((filepath, callback) => {
        callback(null, 'mango\r\nbanana\r\norange\r\napple');
      });
      const fruits = utils.promisifyReadFile('../seed/fruits.txt');
      return expect(fruits).resolves.toStrictEqual(['mango', 'banana', 'orange', 'apple']);
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