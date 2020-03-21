import React from "react";
import {PatientService} from "./patient.service";
import {PatientDto} from "./patient.dto";

export interface PatientProps {
    patientService: PatientService;
}

export const Patient = (prop: PatientProps) => (
    <>
        <button onClick={() => {
            prop.patientService.addNewPatient(new PatientDto("nachname", "vorname", "1234567", "blastraße", "12345"))
        }}>
            Post Patient
        </button>
    </>
);
