import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatient } from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/patients', (_req, res) => {
  res.send(patientsService.getNonSensitiveInfoFromPatients());
});

patientsRouter.post('/patients', (_req, res) => {
  try {
    const newPatient = toNewPatient(_req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(`${error.message as string}`);
  }
});

export default patientsRouter;