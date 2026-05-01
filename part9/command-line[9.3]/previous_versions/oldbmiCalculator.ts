const OLDcalculateBmi = (a: number, b: number) : string => {
  let bmi: number = (b / (a**2)) * 10000
  if (bmi < 18.5 ) {
    return 'Underweight'
  }
  else if (bmi < 25) {
    return 'Normal Weight'
  }
  else if (bmi < 30) {
    return 'Overweight'
  }
  else {
    return 'Obese'
  }
}

try {
  console.log(OLDcalculateBmi(180, 74));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}