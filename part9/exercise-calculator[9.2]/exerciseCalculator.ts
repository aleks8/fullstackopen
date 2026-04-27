interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const exerciseCalculator = (dailyHours: number[], target: number) : Result => {
  //1. Calculate period length (total days) 
  const periodLength = dailyHours.length;
  //2. Count training days (days with hours >0)
  const trainingDays = dailyHours.filter((hours) => hours > 0).length;
  //3. Calculate average hours  
  const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / periodLength;
  //4. Check if the target was reached 
  const success = average >= target;
  //5. Determine rating (1-3) and description
  let rating: number;
  let ratingDescription: string;
  if (average >= target) {
    rating = 3;
    ratingDescription = 'excellent work, target reached!'; 
  } else if (average >= target *.75) {
    rating = 2; 
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'way too little exercise';
  }
  return {
    periodLength,    
    trainingDays,    
    success,    
    rating,    
    ratingDescription,    
    target,    
    average,
  };
}


try {
  const result = exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}