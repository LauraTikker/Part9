import express from 'express';
import diagnosisRouter from './routes/diagnosisRouter';
import patientsRouter from './routes/patientsRouter';
const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.send('pong');
});

app.use('/api', diagnosisRouter);
app.use('/api', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});