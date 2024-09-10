interface Result { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface Data {
  hours: number[],
  target: number,
}

const handleArguments = (args: string[]): Data => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      target: Number(args[2]),
      hours: args.slice(3).map(Number)
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateExercises = (periodHours: number[], targetHours: number): Result => {
  const periodLength = periodHours.length;
  const trainingDays = periodHours.filter(hours => hours > 0).length;
  const average = periodHours.reduce((sum, hours) => sum + hours, 0) / periodLength;
  const success = average >= targetHours;
  let rating: number;
  let ratingDescription: string;

  if (average > targetHours) {
    rating = 3;
    ratingDescription = 'GG';
  } else if (average >= targetHours / 2) {
    rating = 2;
    ratingDescription = 'Well...'
  } else if (average < targetHours) {
    rating = 1;
    ratingDescription = 'Did you even try?'
  }
  
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetHours,
    average
  }
}

try {
  const { target, hours } = handleArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
