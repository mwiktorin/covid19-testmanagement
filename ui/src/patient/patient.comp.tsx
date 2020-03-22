import React, {useState} from "react";
import {PatientService} from "./patient.service";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import {PatientDto} from "./patient.dto";
import {Growl} from "primereact/growl";
import {TestzentrumService} from "../testzentrum/testzentrum.service";
import {TestBeantragenResponseDto} from "../testzentrum/test-beantragen-response.dto";
import {TerminBestaetigung} from "./termin-bestaetigung.comp";


export interface PatientProps {
    testzentrumService: TestzentrumService;
    patientService: PatientService;
}

export const Patient = (props: PatientProps) => {

    const [vorname, setVorname] = useState("");
    const [nachname, setNachname] = useState("");
    const [geburtsdatum, setGeburtsdatum] = useState();
    const [versicherungsnummer, setVersicherungsnummer] = useState("");
    const [anschrift, setAnschrift] = useState("");
    const [postleitzahl, setPostleitzahl] = useState("");
    const [email, setEmail] = useState("");
    const [telefon, setTelefon] = useState("");
    const [emailChecked, setEmailChecked] = useState(false);
    const [smsChecked, setSmsChecked] = useState(false);
    const [telefonChecked, setTelefonChecked] = useState(false);

    const [growl, setGrowl] = useState();
    const [termin, setTermin] = useState();

    function beantrageTermin(patientDto: PatientDto) {
        props.testzentrumService.beantrageTest(patientDto.uuid)
            .then((beantragungResponse: TestBeantragenResponseDto) => {
                setTermin(beantragungResponse);
            })
            .catch(() => {
                growl.show({severity: 'error', summary: 'Kein Termin verfügbar'})
            })
    }

    const terminAnfragen = () => {
        props.patientService.addNewPatient(new PatientDto(nachname, vorname, geburtsdatum, versicherungsnummer, email, telefon, anschrift, postleitzahl, emailChecked, smsChecked, telefonChecked))
            .then((patientDto: PatientDto) => {
                beantrageTermin(patientDto);
            })
            .catch(() => {
                growl.show({severity: 'error', summary: 'Patient anlegen fehlgeschlagen'})
            });
    };

    if (termin) {
        return <TerminBestaetigung termin={termin}/>
    }

    return (
        <>
            <h1>
                Termin beantragen
            </h1>
            <h2>
                Persönliche Daten
            </h2>
            <table>
                <tr>
                    <td>
                        Vorname:
                    </td>
                    <td>
                        <InputText value={vorname}
                                   onChange={(event => setVorname(event.currentTarget.value))}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Nachname:
                    </td>
                    <td>
                        <InputText value={nachname}
                                   onChange={(event => setNachname(event.currentTarget.value))}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Geburtsdatum:
                    </td>
                    <td>
                        <Calendar dateFormat={"dd.mm.yy"} monthNavigator={true} yearNavigator={true}
                                  yearRange="1910:2020"
                                  value={geburtsdatum}
                                  onChange={(event => setGeburtsdatum(event.value))}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Versicherungsnummer:
                    </td>
                    <td>
                        <InputText value={versicherungsnummer}
                                   onChange={(event => setVersicherungsnummer(event.currentTarget.value))}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Straße und Hausnummer:
                    </td>
                    <td>
                        <InputText value={anschrift}
                                   onChange={(event => setAnschrift(event.currentTarget.value))}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Postleitzahl:
                    </td>
                    <td>
                        <InputText value={postleitzahl}
                                   onChange={(event => setPostleitzahl(event.currentTarget.value))}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        E-Mail:
                    </td>
                    <td>
                        <InputText value={email}
                                   onChange={(event => setEmail(event.currentTarget.value))}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Telefon:
                    </td>
                    <td>
                        <InputText value={telefon}
                                   onChange={(event => setTelefon(event.currentTarget.value))}/>
                    </td>
                </tr>
            </table>
            <p>
                Wie möchtest du über dein Ergebnis informiert werden?
            </p>
            <div style={{display: "flex", justifyContent: "space-around"}}>
                <div>
                    <Checkbox inputId="email"
                              checked={emailChecked}
                              onChange={event => setEmailChecked(event.checked)}/>
                    <label htmlFor="email" className="p-checkbox-label">E-mail</label>
                </div>
                <div>
                    <Checkbox inputId="sms"
                              checked={smsChecked}
                              onChange={event => setSmsChecked(event.checked)}/>
                    <label htmlFor="sms" className="p-checkbox-label">SMS</label>
                </div>
                <div>
                    <Checkbox inputId="telefon"
                              checked={telefonChecked}
                              onChange={event => setTelefonChecked(event.checked)}/>
                    <label htmlFor="telefon" className="p-checkbox-label">Telefon</label>
                </div>
            </div>
            <div style={{marginTop: 20, display: "flex", justifyContent: "end"}}>
                <Button label={"Termin anfragen"}
                        onClick={terminAnfragen}/>
            </div>
            <Growl ref={(el) => setGrowl(el)}/>
        </>
    );
};
