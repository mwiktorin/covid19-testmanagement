import React from "react";
import {PatientService} from "./patient.service";
import {PatientDto} from "./patient.dto";
import {InputText} from "primereact/inputtext";

export interface PatientProps {
    patientService: PatientService;
}

export const Patient = (prop: PatientProps) => (
    <>
        <h1>
            Termin beantragen
        </h1>
        <h2>
            Persönliche Daten
        </h2>
        <p>
            <label>
                Vorname:
                <input/>
            </label>
            <br/>
            <label>
                Nachname:
                <InputText/>
            </label>
        </p>
        <p>
            <label>
                Geburtsdatum:
                <input/>
            </label>
            <br/>
            <label>
                Versicherungsnummer:
                <input/>
            </label>
        </p>
        <button onClick={() => {
            prop.patientService.addNewPatient(new PatientDto("nachname", "vorname", "1234567", "blastraße", "12345"))
        }}>
            Post Patient
        </button>
    </>
);
