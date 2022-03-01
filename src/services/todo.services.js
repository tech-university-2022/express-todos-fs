const fs = require('fs');

const promisifyReadFile = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf-8', (error, data) => {
    if (error) {
      reject(error);
    } else {
      const datas = data.toString().split('\n');
      resolve(datas);
    }
  });
});

const appendFile = async (file, s, data) => new Promise((fulfill, reject) => {
  const sss = data.length;
  const ss = `\n${sss}|${s.task}`;
  fs.appendFile(file, ss, (err) => {
    if (!err) {
      fulfill('todo added');
    } else {
      reject(err);
    }
  });
});
const appendToDo = async (file, s) => {
  const data = await promisifyReadFile(file);
  appendFile(file, s, data);
};

function updateFile(file, s, index, arr) {
  return new Promise((fulfill, reject) => {

    const ss = arr.join('\n');
    fs.writeFileSync('./resources/todo.txt', ss);
    fulfill('file updated');
  });
}
const updateToDo = async (file, s, index) => {
  const data = await promisifyReadFile(file);
  data[index - 1] = `${index}|${s.task}`;
  await updateFile(file, s, index, data);
};

const deleteFile = (index, arr) => new Promise((fulfill, reject) => {
  const newArr = [];
  for (let fileLine = 0; fileLine < arr.length; fileLine += 1) {
    const dataa = arr[fileLine].split('|');
    newArr.push({ title: dataa[1] });
  }
  const finalString = [];
  let c = 1;
  for (let fileLine = 0; fileLine < newArr.length; fileLine += 1) {
    if (fileLine !== index - 1) {
      finalString.push(`${c}|${newArr[fileLine].title}`);
      c += 1;
    }
  }
  const ss = finalString.join('\n');
  fs.writeFileSync('./resources/todo.txt', ss);
  fulfill('todo deleted');
});
const deleteTodo = async (index) => {
  const data = await promisifyReadFile('resources/todo.txt');
  deleteFile(index, data);
};
module.exports = {
  promisifyReadFile,
  appendToDo,
  updateToDo,
  deleteTodo,
};
