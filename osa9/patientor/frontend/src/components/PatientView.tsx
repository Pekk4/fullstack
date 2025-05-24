import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

import patientService from "../services/patients";

import { Patient } from "../types";

const PatientView = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      try {
        const data = await patientService.getById(id);
        setPatient(data);
      } catch (error) {
        // TODO
        console.log("Error fetching patient:", error);
      }
    };
    fetchPatient();
  }, [id]);

  if (!patient) return <Typography>Patient not found</Typography>;

  return (
    <div>
      <Typography variant="h4">{patient.name}</Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
    </div>
  );
};

export default PatientView;