const fs = require('fs');
const {
  promisfyReadFiles, promisfyAppendData, promisfyRemoveData,
} = require('../src/utils/fs.utils');

describe('promisfyReadFiles function', () => {
  it('should return invalid data type if file path is not string', async () => {
    const fileContent = promisfyReadFiles(1);
    return expect(fileContent).toBe('invalid data type');
  });
  it('should return error if path of file is invalid', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation((filePath, encodingParam, callback) => {
      callback('ERROR! not a valid path', null);
    });
    const fileContent = promisfyReadFiles('we');
    return expect(fileContent).rejects.toBe('ERROR! not a valid path');
  });
  it('should return all content in an array ', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation((filePath, encodingParam, callback) => {
      callback(null, 'coffee\r\nhot chocolate\r\ntea');
    });
    const fileContent = promisfyReadFiles('./resources/todos.txt');
    return expect(fileContent).resolves.toStrictEqual(['coffee', 'hot chocolate', 'tea']);
  });
});

describe('promisfyAppendData function', () => {
  it('should return invalid data type if file path is not string', async () => {
    const msg = promisfyAppendData(1, 'a');
    return expect(msg).toBe('invalid data type');
  });
  it('should return invalid data type if data is not string', async () => {
    const msg = promisfyAppendData('a', 1);
    return expect(msg).toBe('invalid data type');
  });
  it('should return error if filepath is invalid', () => {
    jest.spyOn(fs, 'appendFile').mockImplementation((filepath, string, callback) => {
      callback('ERROR!');
    });
    const msg = promisfyAppendData('we', 'a');
    return expect(msg).rejects.toBe('ERROR!');
  });
});

describe('promisfyRemoveData function', () => {
  it('should return invalid data type if file path is not string', async () => {
    const msg = promisfyRemoveData(1, 'a');
    return expect(msg).toBe('invalid data type');
  });
  it('should return invalid data type if data is not an array', async () => {
    const msg = promisfyRemoveData('a', 1);
    return expect(msg).toBe('invalid data type');
  });
  it('should return error if filepath is invalid', () => {
    jest.spyOn(fs, 'writeFile').mockImplementation((filepath, string, callback) => {
      callback('ERROR!');
    });
    const msg = promisfyRemoveData('we', ['a']);
    return expect(msg).rejects.toBe('ERROR!');
  });
});
