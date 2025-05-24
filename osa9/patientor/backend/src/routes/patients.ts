import express, { Request, Response, NextFunction } from 'express';
import { z } from "zod";

import patientService from "../services/patientService";
import { newPatientSchema } from "../utils";
import { Patient, NewPatient } from "../types";

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req: Request<{ id: string }>, res: Response<Patient | { error: string }>) => {
  const patient = patientService.getPatientById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send({ error: "Patient not found" });
  }
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient | { error: unknown }>) => {
  try {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
      return;
    }
});

router.use(errorMiddleware);

export default router;
