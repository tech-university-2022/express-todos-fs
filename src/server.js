const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const { todoRouter } = require('./routes/todo.route');
// const { first50Router, specificQuoteRouter } = require('./routes/quotes.route');

env.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use('/todo', todoRouter);

// app.use('/first50', first50Router);
// app.use('/specificQuote', specificQuoteRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
env.config();
