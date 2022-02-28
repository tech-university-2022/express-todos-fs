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

const promisfyWriteFile = (filepath, newTodo) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, newTodo, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data.toString().split('\n'));
            }
        })
    })
}

module.exports = {
    promisfyReadFile,
    promisfyWriteFile
}