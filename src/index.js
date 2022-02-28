const express = require('express');
const env = require('dotenv');
const { getToDoRouter } = require('./routes/getToDoRouter.route');

env.config();
const port = process.env.PORT || 3000;
const app = express();
app.use('/gettodo', getToDoRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
