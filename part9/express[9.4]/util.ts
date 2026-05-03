export const isNotNumber = (argument: any): boolean =>
  isNaN(Number(argument));

export const parseNumberArgument = (argument: string): number => {
  if (isNotNumber(argument)) {
    throw new Error(`Provided value "${argument}" was not a number!`);
  }
  return Number(argument);
};
