import React from "react";
import {Link} from "react-router-dom";

export const Home = () => (
    <>
        <h1>
            GetMeTested
        </h1>
        <p>
            Willkommen bei GetMeTested.
        </p>
        <p>
            Wir helfen dir einen Termin bei deiner nähsten Teststation auszumachen und deine Testergebnisse so schnell
            es geht einzusehen!
        </p>
        <p>
            Damit wir die Teststationen nicht überladen, bitten wir dich vorher den Test in der CovApp zu machen. :)
        </p>

        <Link to={"/patient"}>Testtermin beantragen</Link>
    </>
);
