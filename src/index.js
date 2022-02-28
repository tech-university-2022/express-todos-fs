const express = require("express");
const env = require('dotenv');
const bodyParser = require("body-parser");
const { todoRouter } = require('./routes/todos.router');
env.config();

const app = express();
const port = process.env.PORT || 3000 ;


app.use(bodyParser.json());


app.use('/todos', todoRouter);


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });