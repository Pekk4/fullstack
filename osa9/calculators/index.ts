import express from 'express';

import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
const PORT = 3000;

app.use(express.json());

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

app.post('/exercises', (req, res) => {
  const {
    daily_exercises,
    target
  } = req.body as { daily_exercises: number[], target: number };

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }
  if (!Array.isArray(daily_exercises) || isNaN(target)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  try {
    const result = calculateExercises(daily_exercises, target);
    return res.json(result);
  } catch (error) {
    console.error('Error in calculateExercises:', error);
    return res.status(500).json({ error: 'Something bad happened' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
