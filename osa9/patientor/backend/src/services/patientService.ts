import patientData from "../data/patients";
import { NonSensitivePatient, NewPatient, Patient } from "../types";

import { v4 as uuidv4 } from "uuid";

const getPatients = (): NonSensitivePatient[] => {
  return patientData.map(({ id ,name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( entry: NewPatient ): Patient => {
  const id: string = uuidv4();
  const newPatient = {
    id,
    ...entry
  };

  patientData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient
};
