const { resolve } = require('dns');
const fs = require('fs');

const promisfyReadFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data.toString().split('\n'));
            }
        })
    })
}

const promisfyAppendFile = (filepath, data) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(filepath, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve()
            }
        });
    })
}

module.exports = {
    promisfyReadFile,
    promisfyAppendFile
}