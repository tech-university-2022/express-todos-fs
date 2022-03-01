const express = require('express');
const { healthRouter } = require('./routes/health.route');
var bodyparser = require('body-parser')
const {TodoRouter} = require('./routes/todo.route')

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use('/health', healthRouter);
app.use('/todos', TodoRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
