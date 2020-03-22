import React from "react";
import {Link} from "react-router-dom";

export const Home = () => (
    <>
        <h1>GetMeTested</h1>
        <p>
            Durch GetMeTested soll eine Plattform geschaffen werden, die einen geordneten und übersichtlichen Ablauf bei
            der Testung zur Bestimmung von SARS-CoV2 gewährleistet. Sie dient in erster Linie der Koordination von
            Terminen und der Übermittlung eines positiven oder negativen Testergebnisses an Patienten und
            Gesundheitsämter.
        </p>
        <p>
            Wir helfen ihnen einen Termin bei deiner nächsten Teststation auszumachen und ihreTestergebnisse so schnell
            es geht einzusehen! Zur Erleichterung der Vorauswahl verwenden sie bitte zunächst die COV-App. Der
            Fragebogen dient dazu festzustellen, ob eine weitere Testung nötig ist.
        </p>
        <div style={{display: "flex", textAlign: "center", flexDirection: "column"}}>
            <p>
                <Link to={"/patient"} className={"link"}>Testtermin beantragen</Link>
            </p>
            <p>
                <Link to={"/testzentrum/register"} className={"link"}>Testzentrum registrieren</Link>
            </p>
        </div>
    </>
);
