import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {Patient} from "./patient/patient.comp";
import {RegisterTestzentrum} from "./testzentrum/register-testzentrum.comp";
import {Home} from "./home/home.comp";
import {PatientService} from "./patient/patient.service";

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primeicons/primeicons.css';
import {TestzentrumService} from './testzentrum/testzentrum.service';
import {VerfuegbarkeitTestzentrum} from './testzentrum/verfuegbarkeit-testzentrum.comp';

import "./App.css";

function App() {
    const testzentrumService = new TestzentrumService();
    return <>
        <div style={{
            maxWidth: 500,
            marginLeft: "auto",
            marginRight: "auto"
        }}>
            <Router>
                <Switch>
                    <Route path="/patient">
                        <Patient patientService={new PatientService()} testzentrumService={testzentrumService}/>
                        <Link to={"/"} className={"link"}>Zurück zur Startseite</Link>
                    </Route>
                    <Route path="/testzentrum/register">
                        <RegisterTestzentrum testzentrumService={new TestzentrumService()}/>
                        <Link to={"/"} className={"link"}>Zurück zur Startseite</Link>
                    </Route>
                    <Route path="/testzentrum/:id/verfuegbarkeit"
                           component={(props: any) => <VerfuegbarkeitTestzentrum {...props}
                                                                                 testzentrumService={testzentrumService}/>}/>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </Router>
        </div>
    </>;
}

export default App;
