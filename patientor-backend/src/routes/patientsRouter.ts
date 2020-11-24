import express from 'express';
import patientsService from '../services/patientsService';

const patientsRouter = express.Router();

patientsRouter.get('/patients', (_req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.send(patientsService.getNonSensitiveInfoFromPatients());
});

export default patientsRouter;