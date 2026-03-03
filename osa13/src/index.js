const express = require('express');
const app = express();

const { PORT } = require('./utils/config');
const { connectToDatabase } = require('./utils/db');
const { errorHandler } = require('./utils/middleware');

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const authorsRouter = require('./controllers/authors');
const testingRouter = require('./controllers/testing');
const listRouter = require('./controllers/lists');
const logoutRouter = require('./controllers/logout');

app.use(express.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/readinglists', listRouter);
app.use('/api/logout', logoutRouter);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/reset', testingRouter);
}

app.use(errorHandler);

app.get('/', (_, res) => {
  res.status(200).end();
});

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
