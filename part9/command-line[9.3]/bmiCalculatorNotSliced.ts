interface CalculateValues {
  value1: number;
  value2: number;
}

const parseArgumentsBMINS = (args: string[]): CalculateValues => {
  if (args.length !== 4) throw new Error('Exactly two arguments required.');
  //if (args.length === 2) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmiNS = (heightCm: number, weightKg: number, printText: string) : string => {
  let bmi: number = (weightKg / (heightCm**2)) * 10000
  let result;
  if (bmi < 18.5 ) {
    result = 'Underweight'
  }
  else if (bmi < 25) {
    result = 'Normal Weight'
  }
  else if (bmi < 30) {
    result = 'Overweight'
  }
  else {
    result = 'Obese'
  }
  console.log(printText, result)
  return result
}

try {
  const { value1, value2 } = parseArgumentsBMINS(process.argv);
  calculateBmiNS(value1, value2, `Calculated bmi for ${value1} and ${value2}, the result is:`);
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
