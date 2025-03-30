import express from 'express';

import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const {name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatient = {
    id: Math.random().toString(36).substring(2, 15),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  };
  res.json(newPatient);
});

export default router;
