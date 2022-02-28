const {InputError} = require('../../errors/todos.errors');
const moreUtils = require('../todos.moreUtils');
const utils = require('../todos.utils');
const utilsRead = require('../todos.utils.read');

describe('RemoveFromFile function', () => {
    it('should remove content from file and return the modified file contents in an array', async () => {
      jest.spyOn(utilsRead,'promisifyReadFile').mockResolvedValue(['1|todo1','2|todo2','3|todo3']);
      jest.spyOn(utils,'promisifyWriteFile').mockResolvedValue(['1|todo1','2|todo3']);
      const removedData = await moreUtils.removeFromFile('./resources/todos.txt', 2);
      expect(removedData).toEqual(['1|todo1','2|todo3']);
    });
    it('should return invalid message if file is not found', async () => {
      jest.spyOn(utilsRead, 'promisifyReadFile').mockRejectedValue(new Error('Some error'));
      try {
        await moreUtils.removeFromFile('seed', 2);
      } catch (err) {
        expect(err.message).toBe('Some error');
      }
    });
    it('should return invalid message if filePath is not string', async () => {
      try {
        await moreUtils.removeFromFile(5);
      } catch (err) {
        expect(err.message).toBe('Invalid, enter a proper filepath!');
      }
    });
    it('should return invalid message if filePath is not given', async () => {
      try {
        await moreUtils.removeFromFile();
      } catch (err) {
        expect(err.message).toBe('Invalid, enter a proper filepath!');
      }
    });
    it('should return invalid message if ID is not given', async () => {
      try {
        await moreUtils.removeFromFile('somedirectory');
      } catch (err) {
        expect(err.message).toBe('Invalid, enter proper ID!');
      }
    });
    it('should return invalid message if ID is not number', async () => {
      try {
        await moreUtils.removeFromFile('somedirectory', 'hi');
      } catch (err) {
        expect(err.message).toBe('Invalid, enter proper ID!');
      }
    });
    it('should return invalid message if ID is invalid', async () => {
      try {
        await moreUtils.removeFromFile('somedirectory', -6);
      } catch (err) {
        expect(err.message).toBe('Invalid, enter proper ID!');
      }
    });
  });
  describe('EditFile Function', () => {
    it('should filter content from file and return the modified file contents in an array', async () => {
      jest.spyOn(utilsRead,'promisifyReadFile').mockResolvedValue(['1|todo1','2|todo2','3|todo3']);
      jest.spyOn(utils,'promisifyWriteFile').mockResolvedValue(['1|todo1','2|todo2','3|todo4']);
      const changedData = await moreUtils.editFile(' ', 3, 'todo4');
      expect(changedData).toEqual(['1|todo1','2|todo2','3|todo4']);
    });
    it('should return invalid message if file is not found', async () => {
      jest.spyOn(utilsRead, 'promisifyReadFile').mockRejectedValue(new Error('Some error'));
      try {
        await moreUtils.editFile('seed', 2,'helo');
      } catch (err) {
        expect(err.message).toBe('Some error');
      }
    });
    it('should return invalid message if filePath is not string', async () => {
      try {
        await moreUtils.editFile(5);
      } catch (err) {
        expect(err.message).toBe('Invalid, enter a proper filepath!');
      }
    });
    it('should return invalid message if filePath is not given', async () => {
      try {
        await moreUtils.editFile();
      } catch (err) {
        expect(err.message).toBe('Invalid, enter a proper filepath!');
      }
    });
    it('should return invalid message if ID is not given', async () => {
      try {
        await moreUtils.editFile('somedirectory');
      } catch (err) {
        expect(err.message).toBe('Invalid, enter proper ID!');
      }
    });
    it('should return invalid message if ID is not number', async () => {
      try {
        await moreUtils.editFile('somedirectory', 'hi');
      } catch (err) {
        expect(err.message).toBe('Invalid, enter proper ID!');
      }
    });
    it('should return invalid message if ID is invalid', async () => {
      try {
        await moreUtils.editFile('somedirectory', -6);
      } catch (err) {
        expect(err.message).toBe('Invalid, enter proper ID!');
      }
    });
    it('should return invalid message if new todo is not string', async () => {
      try {
        await moreUtils.editFile('somedirectory', 2, 7);
      } catch (err) {
        expect(err.message).toBe('Invalid, enter proper replacement data!');
      }
    });
    it('should return invalid message if new todo data is not given', async () => {
      try {
        await moreUtils.editFile('somedirectory', 2);
      } catch (err) {
        expect(err.message).toBe('Invalid, enter proper replacement data!');
      }
    });
  });