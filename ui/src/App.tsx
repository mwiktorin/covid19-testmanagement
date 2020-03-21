import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {Patient} from "./patient/patient.comp";
import {Testzentrum} from "./testzentrum/testzentrum.comp";

function App() {
    return (
        <>
            <Router>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/patient">Patient</Link>
                    </li>
                    <li>
                        <Link to="/testzentrum">Testzentrum</Link>
                    </li>
                </ul>
                <Switch>
                    <Route path="/patient">
                        <Patient/>
                    </Route>
                    <Route path="/testzentrum">
                        <Testzentrum/>
                    </Route>
                    <Route path="/">
                        <p>home</p>
                    </Route>
                </Switch>
            </Router>

        </>
    );
}

export default App;
