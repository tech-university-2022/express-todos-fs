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

module.exports = {
  readFile,
};
