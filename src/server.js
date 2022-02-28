const express = require('express');
const env = require('dotenv');
const bodyParser = require("body-parser");
const {healthRouter} = require('./routes/health.route');
const todoRouters = require('./routes/todos.router');
env.config();

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const app = express();

app.use(bodyParser.text());
app.use('/health', healthRouter);
app.use('/todos', todoRouters.getAndAddTodosRouter);

app.listen(port, () => {
  console.log(`Server listening at: http://${host}:${port}`);
});
