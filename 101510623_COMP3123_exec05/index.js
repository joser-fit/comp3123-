const express = require('express');
const path = require('node:path');
const userRouter = require('./routes/users');

const app = express();
const port = Number(process.env.PORT || process.env.port || 8081);

app.use(express.json());
app.use('/api/v1/user', userRouter);

app.get('/home', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'home.html'), (error) => {
    if (error) next(error);
  });
});

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  res.status(500).type('html').send('<h1>Server Error</h1>');
});

app.listen(port, () => {
  console.log('Web server is listening on port ' + port);
});
