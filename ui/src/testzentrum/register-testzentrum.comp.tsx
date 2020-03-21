import React from "react";
import { TestzentrumDto } from './testzentrum.dto';
import { InputText } from 'primereact/inputtext';
import { TestzentrumService } from './testzentrum.service';
import './register-testzentrum.css';
import { Button } from 'primereact/button';

export interface RegisterTestzentrumProps {
    testzentrumService: TestzentrumService
}

export const RegisterTestzentrum = (props: RegisterTestzentrumProps) => {
    const [name, setName] = React.useState("");
    const [plz, setPlz] = React.useState("");
    const [anschrift, setAnschrift] = React.useState("");
    const [telefonnummer, setTelefonnummer] = React.useState("");

    const handleSubmit = () => props.testzentrumService.addNewTestzentrum(new TestzentrumDto(name, plz, anschrift, telefonnummer));

    return (
        <>
            <h1>Registrierung</h1>
            <form className={"center-vertically"} onSubmit={() => handleSubmit()}>
                <label>
                    Name der Station
                    <InputText onChange={(e) => setName(e.currentTarget.value)}/>
                </label>
                <label>
                    PLZ
                    <InputText onChange={(e) => setPlz(e.currentTarget.value)}/>
                </label>
                <label>
                    Straße/Nr.
                    <InputText onChange={(e) => setAnschrift(e.currentTarget.value)}/>
                </label>
                <label>
                    Telefonnummer
                    <InputText onChange={(e) => setTelefonnummer(e.currentTarget.value)}/>
                </label>
                <Button type="submit" label={"Registrieren"}/>
            </form>
        </>
    );
};
