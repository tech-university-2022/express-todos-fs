const fs = require('fs');

function readFile(filePath) {
  return new Promise((fulfill, reject) => {
    fs.readFile(filePath, 'utf-8', (err, result) => {
      if (err) {
        reject(err.message);
      }
      fulfill(result);
    });
  });
}

async function appendFile(filePath, data) {
  return new Promise((fulfill, reject) => {
    fs.appendFile(filePath, data, (err) => {
      if (err) {
        reject(err.message);
      }
      fulfill('Successfully written into the file!');
    });
  });
}

async function writeFile(filePath, data) {
  return new Promise((fulfill, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        reject(err.message);
      }
      fulfill('Successfully written into the file!');
    });
  });
}

module.exports = {
  readFile, appendFile, writeFile,
};
