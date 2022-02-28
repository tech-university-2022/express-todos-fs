const fs = require('fs');
const { readFile } = require('../../src/utils/fileOperations.utils');
const { appendFile } = require('../../src/utils/fileOperations.utils');

describe('readfile function', () => {
  test('should return the todos string if a proper input path for todos file is given', () => {
    jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => {
      callback(null, '1|Take a break\n2|Make tea\n3|Buy 1kg rice\n4|Follow tdd daily\n5|Buy vegetables');
    });
    return readFile('../../resources/todos.txt').then((data) => {
      expect(data).toBe('1|Take a break\n2|Make tea\n3|Buy 1kg rice\n4|Follow tdd daily\n5|Buy vegetables');
    });
  });
  test('should return error when file path not exists', () => {
    jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => {
      callback(new Error('ENOENT: no such file or directory, open \'C:\\Users\\Aishwarya S R\\-express-todos-fs\\resources\\todos.txt\''), '');
    });
    return readFile('../../resources/todos1.txt').catch((data) => {
      expect(data).toBe('ENOENT: no such file or directory, open \'C:\\Users\\Aishwarya S R\\-express-todos-fs\\resources\\todos.txt\'');
    });
  });
});

describe('appendfile function', () => {
  test('should print successfully written if a proper input path for todos file is given', () => {
    jest.spyOn(fs, 'appendFile').mockImplementation((path, data, callback) => {
      callback(null);
    });
    return appendFile('../../resources/todos.txt', '7|get milk').then((data) => {
      expect(data).toBe('Successfully written into the file!');
    });
  });
  test('should return error when file path not exists', () => {
    jest.spyOn(fs, 'readFile').mockImplementation((path, data, callback) => {
      callback(new Error('ENOENT: no such file or directory, open \'C:\\Users\\Aishwarya S R\\-express-todos-fs\\resources\\todos.txt\''), '');
    });
    return readFile('../../resources/todos1.txt', '7|get milk').catch((data) => {
      expect(data).toBe('ENOENT: no such file or directory, open \'C:\\Users\\Aishwarya S R\\-express-todos-fs\\resources\\todos.txt\'');
    });
  });
});
