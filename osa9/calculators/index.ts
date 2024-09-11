import express from 'express';

const app = express();

const PORT = 3000;

app.get('/hello', (_, res) => {
  res.send('Hello, Full Stack!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
