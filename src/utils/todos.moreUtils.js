const utils = require('./todos.utils');
const utilsRead = require('./todos.utils.read');
const {InputError} = require('../errors/todos.errors');

const editFile = async (filePath, id, newData) => {
    if (!filePath) throw new InputError('InputError','Invalid, enter a proper filepath!',400);
    else if (typeof filePath !== 'string') throw new InputError('InputError','Invalid, enter a proper filepath!',400);
    if (!id) throw new InputError('InputError','Invalid, enter proper ID!',400);
    else if(typeof id !== 'number'|| id <= 0) throw new InputError('InputError','Invalid, enter proper ID!',400);
    if(!newData) throw new InputError('InputError','Invalid, enter proper replacement data!', 400);
    else if(typeof newData !== 'string') throw new InputError('InputError','Invalid, enter proper replacement data!', 400);
    
    let content = await utilsRead.promisifyReadFile(filePath);
    
    if(id > content.length) throw new InputError('InputError','Invalid, enter proper ID!',400);

    content[id - 1] = `${id}|${newData}`;
    const modifiedFile = await utils.promisifyWriteFile(filePath, content.join('\r\n'));
    return modifiedFile;
};
const removeFromFile = async (filePath, id) => {
    if (!filePath) throw new InputError('InputError','Invalid, enter a proper filepath!',400);
    if (typeof filePath !== 'string') throw new InputError('InputError','Invalid, enter a proper filepath!',400);
    if (!id) throw new InputError('InputError','Invalid, enter proper ID!',400);
    if (id <= 0 || typeof id !== 'number') throw new InputError('InputError','Invalid, enter proper ID!',400);
    let content = await utilsRead.promisifyReadFile(filePath);
    if(id > content.length) throw new InputError('InputError','Invalid, enter proper ID!',400);
    content = content.filter((item) => item!== content[id - 1]).map((item, index) => item.replace(item.charAt(0),(index + 1).toString()));
    const writePromise = await utils.promisifyWriteFile(filePath, content.join('\r\n'));
    return writePromise;
};
module.exports ={
      editFile,
      removeFromFile,
}