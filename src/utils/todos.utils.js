const fs = require('fs');

const promisifyReadDir = (directoryPath) => new Promise((resolve, reject) => {
  if (typeof directoryPath !== 'string') throw new Error('Invalid, enter a proper Directory Path!');
  fs.readdir(directoryPath, (err, data) => {
    if (err) reject(new Error('Directory not found!'));
    else resolve(data);
  });
});
const promisifyReadFile = (filePath) => new Promise((resolve, reject) => {
    if (typeof filePath !== 'string') throw new Error('Invalid, enter a proper filepath!');
    fs.readFile(filePath, (err, data) => {
      if (err) reject(err);
      else resolve(data.toString().split('\r\n'));
    });
});
const promisifyAppendFile = (filePath, data) => new Promise((resolve, reject) => {
    if (typeof filePath !== 'string') throw new Error('Invalid, enter a proper filepath!');
    if (!data) throw Error('Invalid, Enter data to write!');
    else if (typeof data !== 'string') throw new Error('Invalid, enter string buffer data!');
    fs.appendFile(filePath, data, (err) => {
      if (err) reject(new Error(`Cannot write into file '${filePath}'!`));
      return resolve(promisifyReadFile(filePath));
    });
});

module.exports ={
    promisifyReadDir,
    promisifyReadFile,
    promisifyAppendFile,
}
  