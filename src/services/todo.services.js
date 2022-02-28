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

const appendFile = async (file, s) => new Promise((fulfill, reject) => {
  const data = fs.readFileSync('./resources/todo.txt').toString();
  // const data = await promisifyReadFile('./resources/todo.txt');
  const sss = data.split('\n').length;
  const ss = `${sss}|${s.task}\n`;
  fs.appendFile(file, ss, (err) => {
    if (!err) {
      fulfill('todo added');
    } else {
      reject(err);
    }
  });
});

function updateFile(file, s, index) {
  return new Promise((fulfill, reject) => {
    const data = fs.readFileSync('./resources/todo.txt').toString();
    const arr = data.split('\n');
    arr[index - 1] = `${index}|${s.task}`;
    const ss = arr.join('\n');
    fs.writeFileSync('./resources/todo.txt', ss);
    fulfill('file updated');
  });
}

const deleteFile = (index) => new Promise((fulfill, reject) => {
  const data = fs.readFileSync('./resources/todo.txt').toString();
  const arr = data.split('\n');
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

module.exports = {
  promisifyReadFile,
  appendFile,
  updateFile,
  deleteFile,
};
