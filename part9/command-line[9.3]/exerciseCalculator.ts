import { parseNumberArgument } from "./util";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgumentsEC = (args: string[]): {target: number; dailyHours: number[]} => {
  if (args.length < 2) throw new Error('Not enough arguments');
  //if (args.length > 4) throw new Error('Too many arguments');
  const target = parseNumberArgument(args[0]);
  // Remaining arguments are daily hours  
  const dailyHours = args.slice(1).map(parseNumberArgument)
  return { target, dailyHours };
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
  const { target, dailyHours} = parseArgumentsEC(process.argv.slice(2));
  const result = exerciseCalculator(dailyHours, target);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}