import React from "react";
import {Link} from "react-router-dom";

export const Home = () => (
    <>
        <h1>GetMeTested</h1>
        <p>
            GetMeTested ist eine Plattform die einen geordneten, übersichtlichen, effizienten, effektiven und
            transparenten Ablauf im Rahmen des SARS-CoV2 Tests gewährleistet. Die Platform dient in erster Linie den
            Patienten, den Gesundheitsämter den Laboren und der Kassenärztlichen Vereinigungen und hilft bei der
            Koordination von Terminen und der Übermittlung des individuellem persönlichen Testergebnisses.
        </p>
        <p>
            Wir helfen Dir einen Termin bei deiner nächsten Teststation auszumachen und Dein Testergebnis so schnell es
            geht einzusehen! Zur Erleichterung der Vorauswahl verwende bitte zunächst die COV-App. Der Fragebogen dient
            dazu festzustellen, ob eine weitere Testung nötig ist.
        </p>
        <div style={{display: "flex", textAlign: "center", flexDirection: "column"}}>
            <p>
                <Link to={"/patient"} className={"link"}>Für Patienten: Testtermin beantragen</Link>
            </p>
            <p>
                <Link to={"/testzentrum/register"} className={"link"}>Für Testzentren: Testzentrum registrieren</Link>
            </p>
        </div>
    </>
);
