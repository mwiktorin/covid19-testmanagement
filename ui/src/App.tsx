import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Patient} from "./patient/patient.comp";
import {Testzentrum} from "./testzentrum/testzentrum.comp";
import {Home} from "./home/home.comp";
import {PatientService} from "./patient/patient.service";

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/patient">
                        <Patient patientService={new PatientService()}/>
                    </Route>
                    <Route path="/testzentrum">
                        <Testzentrum/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </Router>

        </>
    );
}

export default App;
