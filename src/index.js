const bodyParser = require('body-parser');
const express = require('express');
const { todoRouter } = require('./routes/todos.route');

const port = 4000;
const app = express();
app.use(bodyParser.json());
app.use('/todos', todoRouter);
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
