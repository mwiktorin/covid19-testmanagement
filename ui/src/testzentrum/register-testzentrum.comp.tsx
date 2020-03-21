import React, { useState } from "react";
import { TestzentrumDto } from './testzentrum.dto';
import { InputText } from 'primereact/inputtext';
import { TestzentrumService } from './testzentrum.service';
import './register-testzentrum.css';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';

export interface RegisterTestzentrumProps {
    testzentrumService: TestzentrumService
}

export const RegisterTestzentrum = (props: RegisterTestzentrumProps) => {
    const [name, setName] = useState("");
    const [plz, setPlz] = useState("");
    const [anschrift, setAnschrift] = useState("");
    const [telefonnummer, setTelefonnummer] = useState("");
    const [form, setForm] = useState();
    const [growl, setGrowl] = useState();

    const handleSubmit = () =>
        props.testzentrumService.addNewTestzentrum(new TestzentrumDto(name, plz, anschrift, telefonnummer))
            .then(() => {
                form.reset();
                growl.show({severity: 'success', summary: 'Anfrage erfolgreich'});
            })
            .catch(() => growl.show({severity: 'error', summary: 'Anfrage fehlgeschlagen'}));

    return (
        <div className={"container"}>
            <h1>Registrierung</h1>
            <form ref={(el) => setForm(el)} onSubmit={event => {
                event.preventDefault();
                handleSubmit();
            }}>
                <div className={"form-row"}>
                    <label>Name der Station</label>
                    <InputText required={true} onChange={(e) => setName(e.currentTarget.value)}/>
                </div>
                <div className={"form-row"}>
                    <label>PLZ</label>
                    <InputText required={true} onChange={(e) => setPlz(e.currentTarget.value)}/>
                </div>
                <div className={"form-row"}>
                    <label>Straße/Nr.</label>
                    <InputText required={true} onChange={(e) => setAnschrift(e.currentTarget.value)}/>
                </div>
                <div className={"form-row"}>
                    <label>Telefonnummer</label>
                    <InputText required={true} onChange={(e) => setTelefonnummer(e.currentTarget.value)}/>
                </div>
                <Button label={"Registrieren"} type={"submit"}/>
            </form>
            <Growl ref={(el) => setGrowl(el)}/>
        </div>
    );
};
