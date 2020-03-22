import React from "react";
import {Link} from "react-router-dom";

export const Home = () => (
    <>
        <h1>GetMeTested</h1>
        <p>
            GetMeTested ist eine Plattform, die einen geordneten, übersichtlichen, effizienten, effektiven und
            transparenten Ablauf im Rahmen des SARS-CoV2 Tests gewährleistet. Die Plattform dient in erster Linie den
            Patienten, den Gesundheitsämtern, den Laboren und den Kassenärztlichen Vereinigungen und hilft bei der
            Koordination von Terminen und der Übermittlung des individuellen persönlichen Testergebnisses.
        </p>
        <p>
            Wir helfen Dir, einen Termin bei einem Testzentrum in Deiner Nähe zu bekommen und Dein Testergebnis
            schnellstmöglich einzusehen! Zur Erleichterung der Vorauswahl verwende bitte zunächst die CovApp. Der
            Fragebogen dient dazu festzustellen, ob ein Test nötig ist.
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
