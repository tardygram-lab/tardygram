const express = require('express');
const app = express();

app.use(express.json());
app.use(require('cookie-parser')());

app.use('/api/v1/auth', require('./controllers/auth'));
app.use('/api/v1/gram', require('./controllers/gram'));
app.use('/api/v1/comment', require('./controllers/comment'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
