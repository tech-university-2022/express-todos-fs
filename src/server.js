const express = require('express');
const env = require('dotenv');
const bodyParser = require("body-parser");
const {healthRouter} = require('./routes/health.route');
const {todoRouter} = require('./routes/todos.router');
env.config();

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const app = express();

app.use(bodyParser.json());
app.use('/health', healthRouter);
app.use('/todos', todoRouter);

app.listen(port, () => {
  console.log(`Server listening at: http://${host}:${port}`);
});
