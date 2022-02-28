const fs = require('fs');

const getDataFromFile = (filePath = 'C:\\Users\\Twissa Modi\\express-todos-fs\\resources\\todos.txt') => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf-8', (err, fileContent) => {
    if (err) {
      return reject(new Error('File cannot be opened.'));
    }

    const todosData = fileContent.toString().split('\r\n').filter((currentElement) => currentElement !== '');
    return resolve(todosData);
  });
});
const appendToFile = (content, filePath = 'C:\\Users\\Twissa Modi\\express-todos-fs\\resources\\todos.txt') => new Promise((fulfill, reject) => {
  fs.appendFile(filePath, content, (err) => {
    if (err) {
      return reject(new Error('Data could not be written'));
    }
    return fulfill('Data added successfully');
  });
});
const writeToFile = (content, filePath = 'C:\\Users\\Twissa Modi\\express-todos-fs\\resources\\todos.txt') => new Promise((fulfill, reject) => {
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      return reject(new Error('Data could not be written'));
    }
    return fulfill('Data written successfully.');
  });
});
module.exports = {
  getDataFromFile,
  appendToFile,
  writeToFile,
};
