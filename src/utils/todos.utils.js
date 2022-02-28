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
const promisifyAppendFile = (filePath, data) => new Promise((resolve, reject) => {
    if (typeof filePath !== 'string') throw new InputError('InputError','Invalid, enter a proper filepath!',400);
    if (!data) throw InputError('InputError','Invalid, Enter data to write!',400);
    else if (typeof data !== 'string') throw new InputError('InputError','Invalid, enter string buffer data!',400);
    fs.appendFile(filePath, data, (err) => {
      if (err) reject(new Error(`Cannot write into file '${filePath}'!`));
      return resolve(promisifyReadFile(filePath));
    });
});
const promisifyWriteFile = (filePath, data) => new Promise((resolve, reject) => {
  if (typeof filePath !== 'string') throw new InputError('InputError','Invalid, enter a proper filepath!',400);
  if (!data) throw new Error('Invalid, Enter data to write!');
  else if (typeof data !== 'string') throw new InputError('InputError','Invalid, enter string buffer data!',400);
  fs.writeFile(filePath, data, (err) => {
    if (err) reject(new Error(`Cannot write into file '${filePath}'!`));
    return resolve(promisifyReadFile(filePath));
  });
});

//pass parseInt(index)
const editFile = async (filePath, id, newData) => {
  if (!filePath) throw new InputError('InputError','Invalid, enter a proper filepath!',400);
  if (typeof filePath !== 'string') throw new InputError('InputError','Invalid, enter a proper filepath!',400);
  let content = await promisifyReadFile(filePath);
  if (!id) throw new InputError('InputError','Invalid, enter proper search ID!',400);
  if(typeof id !== 'number' || id > content.length || id <= 0) throw new InputError('InputError','Invalid, enter proper Search ID!',400);
  if(!newData) throw new InputError('InputError','Invalid, enter replacement data!', 400);
  content[id - 1] = `${id}|${newData}`;
  const modifiedFile = await promisifyWriteFile(filePath, content.join('\r\n'));
  return modifiedFile;
};
module.exports ={
    promisifyReadDir,
    promisifyReadFile,
    promisifyAppendFile,
    promisifyWriteFile,
    editFile,
};