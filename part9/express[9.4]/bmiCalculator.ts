import { parseNumberArgument } from "./util";

interface CalculateValues {
  value1: number;
  value2: number;
}

const parseArgumentsBMI = (args: string[]): CalculateValues => {
  if (args.length !== 2) throw new Error('Exactly two arguments required.');
  //if (args.length === 2) throw new Error('Too many arguments');

  return {
      value1: parseNumberArgument(args[0]),
      value2: parseNumberArgument(args[1])
  }
}

const calculateBmi = (heightCm: number, weightKg: number, printText: string) : string => {
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
  const { value1, value2 } = parseArgumentsBMI(process.argv.slice(2));
  calculateBmi(value1, value2, `Calculated bmi for ${value1} and ${value2}, the result is:`);
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
