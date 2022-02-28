const fs = require('fs');

const promisfyReadFiles = (filePath) => {
  if (typeof filePath !== 'string') {
    return 'invalid data type';
  }
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        reject('ERROR! not a valid path');
      }
      resolve(data.split('\r\n'));
    });
  });
};

const promisfyAppendData = (filePath, data) => {
  if (typeof filePath !== 'string' || typeof data !== 'string') {
    return 'invalid data type';
  }
  return new Promise((resolve, reject) => {
    fs.appendFile(filePath, data, (err) => {
      if (err) {
        reject('ERROR!');
      }
      resolve();
    });
  });
};

const promisfyRemoveData = (filePath, data) => {
  if (typeof filePath !== 'string' || !(data instanceof Array)) {
    return 'invalid data type';
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data.join('\r\n'), (err) => {
      if (err) {
        reject('ERROR!');
      }
      resolve();
    });
  });
};

module.exports = {
  promisfyReadFiles,
  promisfyAppendData,
  promisfyRemoveData,
};
