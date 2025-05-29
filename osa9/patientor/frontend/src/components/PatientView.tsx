import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, List, ListItem } from "@mui/material";

import patientService from "../services/patients";

import { Patient, Entry, Diagnosis } from "../types";

interface PatientViewProps {
  diagnoses: Diagnosis[];
}

const PatientView = ({ diagnoses }: PatientViewProps) => {
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
      <Typography variant="h6">Entries</Typography>
      <div>
        {patient.entries.map((entry: Entry) => (
          <div key={entry.id}>
            <Typography>{entry.date} {entry.description}</Typography>
            <List>
              {entry.diagnosisCodes && entry.diagnosisCodes.map((code: string) => (
                <ListItem key={code}>
                  <Typography>{code} {diagnoses.find(diagnosis => diagnosis.code === code)?.name}</Typography>
                </ListItem>
              ))}
            </List>
         </div>
        ))}
      </div>
    </div>
  );
};

export default PatientView;