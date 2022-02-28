const utilsRead = require("./todos.utils.read");
const {InputError} = require('../errors/todos.errors');
const fs = require('fs');

const promisifyWriteFile = (filePath, data) => new Promise((resolve, reject) => {
    if (typeof filePath !== 'string') throw new InputError('InputError','Invalid, enter a proper filepath!',400);
    if (!data) throw new Error('Invalid, Enter data to write!');
    else if (typeof data !== 'string') throw new InputError('InputError','Invalid, enter string buffer data!',400);
    fs.writeFile(filePath, data, (err) => {
      if (err) reject(new Error(`Cannot write into file '${filePath}'!`));
      return resolve(utilsRead.promisifyReadFile(filePath));
    });
});

const promisifyAppendFile = (filePath, data) => new Promise((resolve, reject) => {
    if (typeof filePath !== 'string') throw new InputError('InputError','Invalid, enter a proper filepath!',400);
    if (!data) throw new InputError('InputError','Invalid, Enter data to write!',400);
    else if (typeof data !== 'string') throw new InputError('InputError','Invalid, enter string buffer data!',400);
    fs.appendFile(filePath, data, (err) => {
      if (err) reject(new Error(`Cannot write into file '${filePath}'!`));
      return resolve(utilsRead.promisifyReadFile(filePath));
    });
});

module.exports = {
    promisifyWriteFile,
    promisifyAppendFile,
};