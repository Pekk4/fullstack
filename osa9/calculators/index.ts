import express from 'express';

import calculateBmi from './bmiCalculator';

const app = express();
const PORT = 3000;

app.get('/hello', (_, res) => {
  res.send('Hello, Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(height, weight);

  return res.json({
    weight,
    height,
    bmi,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
