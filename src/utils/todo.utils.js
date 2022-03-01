const fs = require('fs');
const path = require('path');

const promisfyWriteFile =(filepath,val) =>{
  return new Promise((resolve,reject)=>{
    fs.writeFile(filepath,val,(error,data)=>{
      if(error) {
        reject(error);
    }else{
        resolve(data);
    }
    })
  })
}

const fetchTodos = (filePath) => {
  return new Promise((resolve , reject ) => {
      fs.readFile(filePath, 'utf-8' , (error,data) => {
          if(error) {
              reject(error);
          }else{
              resolve(data.toString().split('\r\n').map(data=>data.split('|')));
          }
      })
  })
}

const saveTodos = (filePath, data) =>{
  return new Promise((resolve,reject)=>{
    fs.appendFile(filePath, data, (err) => {
      if (err) {
        reject(err);
      }else{
        resolve();
      }
    });
  })
}

const updateFile = (filePath ,oldTodo,newTodo)=>{
  return new Promise((resolve,reject)=>{
    fs.readFile(filePath, 'utf-8',(err,data)=>{
      if(err){
        reject(err)
      }else{
        const formatted = data.replace(oldTodo,newTodo);
        resolve(
          promisfyWriteFile(filePath,formatted)
        )
      }
    })

  })
}

module.exports={
  fetchTodos,
  saveTodos,
  updateFile,
  promisfyWriteFile
}