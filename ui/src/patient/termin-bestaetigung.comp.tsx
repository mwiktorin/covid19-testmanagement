import React from "react";

import * as moment from 'moment';
import 'moment/locale/de';
import {TestBeantragenResponseDto} from "../testzentrum/test-beantragen-response.dto";

moment.locale("de");

export interface TerminBestaetigungProps {
    termin: TestBeantragenResponseDto
}

export const TerminBestaetigung = (props: TerminBestaetigungProps) => {
    const datum = moment.unix(props.termin.when).format("LLLL");
    const query = `${props.termin.testCenter.anschrift} ${props.termin.testCenter.plz}`.replace(/ /g, "%20");
    return (
        <>
            <h1>Bestätigung</h1>
            <h2>
                für deine Anfrage
            </h2>
            <p>
                <strong>{datum}</strong>
            </p>
            <p>
                {props.termin.testCenter.name} <br/>
                Telefonnummer: {props.termin.testCenter.telefonnummer} <br/>
                Anschrift: {props.termin.testCenter.anschrift} <br/>
                Postleitzahl: {props.termin.testCenter.plz}
            </p>
            <h2>
                Anfahrt
            </h2>
            <iframe width="600" height="500"
                    title={"Anfahrt"}
                    src={`https://maps.google.com/maps?q=${query}&output=embed`}
                    frameBorder="0" scrolling="no"/>
        </>
    );
};
