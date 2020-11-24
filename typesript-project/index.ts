/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {

    if (_req.query.height && _req.query.weight) {
        const height =Number(_req.query.height);
        const weight =Number(_req.query.weight);

        if (!isNaN(height) && !isNaN(weight)) {
            const result = calculateBmi(height, weight);

            res.send({
                weight: weight,
                height: height,
                bmi: result
            });
         
            } else {
                res.status(404).json({ error: "malformatted parameters" });
            }
        
    } else {
        res.status(404).json({ error: "malformatted parameters" });
    }
  });

  app.post('/exercises', (_req, res) => {
    const daily_exercises: string[] = _req.body.daily_exercises;

    const target: string = _req.body.target;

    if (daily_exercises && target) {

        const targetDailyAmount = Number(target);

        const exerciseHoursDaily = daily_exercises.map((exercises: string) => {
            const hours = Number(exercises);
            if (isNaN(hours)) {
                res.status(404).json({ error: "malformatted parameters" });
            }
            return hours;
        });

        if (!isNaN(targetDailyAmount)) {
     
            const result = calculateExercises(exerciseHoursDaily, targetDailyAmount);

            res.send(result);
         
        } else {
            res.status(404).json({ error: "malformatted parameters" });
        }
    
    } else {
        res.status(404).json({ error: "parameters missing" });
    }
  });

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});