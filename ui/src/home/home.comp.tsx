import React from "react";
import { Link } from "react-router-dom";
import "./home.comp.css";

export const Home = () => (
    <div className={"outerContainer"}>
        <span>Willkommen bei</span>
        <h1>Get me tested</h1>
        <div className={"innerContainer"}>
            <p>Durch GET ME TESTED soll eine Plattform geschaffen wer-den, die einen geordneten und übersichtlichen
                Ablauf bei der Testung zur Bestimmung von SARS-CoV2 gewährleistet. Sie dient in erster Linie der
                Koordination von Terminen und der Übermittlung eines positiven oder negativen Testergeb-nisses an
                Patienten und Gesundheitsämter</p>
            <Link to={"/patient"}>Testtermin beantragen</Link>
        </div>
    </div>
);
