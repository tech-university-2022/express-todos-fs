const fs = require('fs');
const {InputError} = require('../errors/todos.errors');

const promisifyReadDir = (directoryPath) => new Promise((resolve, reject) => {
  if (typeof directoryPath !== 'string') throw new InputError('InputError','Invalid, enter a proper Directory Path!',400);
  fs.readdir(directoryPath, (err, data) => {
    if (err) reject(new InputError('InputError','Directory not found!',400));
    else resolve(data);
  });
});
const promisifyReadFile = (filePath) => new Promise((resolve, reject) => {
    if (typeof filePath !== 'string') throw new InputError('InputError','Invalid, enter a proper filepath!',400);
    fs.readFile(filePath, (err, data) => {
      if (err) reject(err);
      else resolve(data.toString().split('\r\n'));
    });
});

module.exports ={
    promisifyReadDir,
    promisifyReadFile,
};
