import { z } from 'zod';

import { Gender, NewPatient } from "./types";

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  occupation: z.string(),
  gender: z.nativeEnum(Gender),
});


export const toNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object);
};
