interface InputValues {
    height: number;
    weight: number;
}

export const calculateBmi = (height: number, weight: number): string => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    console.log(bmi);

    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 25) {
        return 'Normal (healthy weight)';
    } else if (bmi < 30) {
        return 'Overweight';
    } else if (bmi >= 30) {
        return 'Obese ';
    } else {
        throw new Error('Could not calculate bmi');
    }

};

const parseArguments = (args: Array<string>): InputValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    const height = Number(process.argv[2]);
    const weight = Number(process.argv[3]);
  
    if (!isNaN(height) && !isNaN(weight)) {
      return {
        height: height,
        weight: weight
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
};

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (e) {
    console.log('Something went wrong, error message: ');
}