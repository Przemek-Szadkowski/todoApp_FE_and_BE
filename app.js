const express = require('express');
const { todoRouter } = require('./routes/todo');

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use('/todo', todoRouter);

app.listen(port, '0.0.0.0');