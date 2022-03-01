const { resolve } = require('dns');
const fs = require('fs');

const promisfyWriteFile = (filepath, val) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, val, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        })
    })
}

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
                resolve(data);
            }
        });
    })
}

const promisfyUpdateFile = (filePath, oldTodo, newTodo) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                const formatted = data.replace(oldTodo, newTodo);
                resolve(
                    promisfyWriteFile(filePath, formatted)
                )
            }
        })

    })
}

module.exports = {
    promisfyReadFile,
    promisfyAppendFile,
    promisfyWriteFile,
    promisfyUpdateFile

}
