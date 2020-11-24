interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Rating {
    rating: number;
    ratingDescription: string;
}

interface ExerciseCalculatorInputValues {
    targetDailyAmount: number;
    exerciseHoursDaily: number[];
}

const parseExerciseCalculatorArguments = (args: Array<string>): ExerciseCalculatorInputValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const targetDailyAmount = Number(process.argv[2]);

    const exerciseHoursDaily: number[] = [];

    for (let i = 3; i < args.length; i++) {
        if (!isNaN(Number(process.argv[i]))) {
            exerciseHoursDaily.push(Number(process.argv[i]));
        } else {
            throw new Error('Provided values were not numbers!');
        }
    }
    if (!isNaN(targetDailyAmount)) {
      return {
        targetDailyAmount: targetDailyAmount,
        exerciseHoursDaily: exerciseHoursDaily
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
};

export const calculateExercises = (exerciseHoursDaily: Array<number>, targetAmountDaily: number): Result => {

    const trainingDays = exerciseHoursDaily.filter(hours => hours !== 0);

    const totalHoursExercised = exerciseHoursDaily.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);

    const trainigPeriodLength = exerciseHoursDaily.length;

    const average = totalHoursExercised / trainigPeriodLength;

    const success = average > targetAmountDaily;

    const rating = calculateRating(average, targetAmountDaily);

    return {
        periodLength: trainigPeriodLength,
        trainingDays: trainingDays.length,
        target: targetAmountDaily,
        success: success,
        average: average,
        rating: rating.rating,
        ratingDescription: rating.ratingDescription
    };
};

const calculateRating = (average: number, targetAmountDaily: number): Rating => {

    let rating;
    let ratingDescription;

    if (targetAmountDaily < average) {
        rating = 3;
        ratingDescription = 'Daily goal reached';
    } else if (targetAmountDaily / 2 < average) {
        rating = 2;
        ratingDescription = 'Daily goal not reached';
    } else {
        rating = 1;
        ratingDescription = 'Far from daily goal';
    } 

    return {
        rating: rating,
        ratingDescription
    };
};

try {
    const { targetDailyAmount, exerciseHoursDaily } = parseExerciseCalculatorArguments(process.argv);
    console.log(calculateExercises(exerciseHoursDaily, targetDailyAmount));
} catch(e) {
    console.log('Something went wrong, error message: ');
}

