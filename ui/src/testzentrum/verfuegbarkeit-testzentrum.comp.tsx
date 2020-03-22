import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import "./verfuegbarkeit-testzentrum.comp.css"
import { TestzentrumService } from './testzentrum.service';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { VerfuebarkeitTestzentrumDto } from './verfuebarkeit-testzentrum.dto';

interface VerfuegbarkeitTestzentrumProps {
    match: any;
    testzentrumService: TestzentrumService;
}

export const VerfuegbarkeitTestzentrum = (props: VerfuegbarkeitTestzentrumProps) => {

    const initialNumberOfDaysShown = 10;
    const getInitialVerfuegbarkeitState = () => {
        const result: { [index: number]: VerfuebarkeitTestzentrumDto } = {};
        for (let i = 0; i < initialNumberOfDaysShown; i++) {
            result[i] = new VerfuebarkeitTestzentrumDto(0, 0, undefined, undefined);
        }
        return result;
    };

    const [showDays] = useState(initialNumberOfDaysShown);
    const [verfuegbarkeit, setVerfuegbarkeit] = useState(getInitialVerfuegbarkeitState());
    const [growl, setGrowl] = useState();

    const handleSubmit = () => {
        Object.values(verfuegbarkeit).forEach((verfuegbarkeitItem) => {
            const {parallel, slotDurationMinutes, fromUnixTimeStamp, toUnixTimeStamp} = verfuegbarkeitItem;
            if (!fromUnixTimeStamp || !toUnixTimeStamp) {
                return;
            }
            const verfuebarkeitTestzentrumDto = new VerfuebarkeitTestzentrumDto(parallel, slotDurationMinutes, fromUnixTimeStamp, toUnixTimeStamp);
            props.testzentrumService.addVerfuegbarkeitTestzentrum(props.match.params.id, verfuebarkeitTestzentrumDto)
                .then(() => {
                    growl.show({severity: 'success', summary: 'Anfrage erfolgreich'});
                }).catch(() => growl.show({severity: 'error', summary: 'Anfrage fehlgeschlagen'}));
        });
    };

    const updateState = (index: number, propertyChanged: keyof VerfuebarkeitTestzentrumDto, value: any) =>
        setVerfuegbarkeit(prevState => ({...prevState, [index]: {...prevState[index], [propertyChanged]: value}}));

    const getDate: (index: number) => Date = (index: number) => {
        const todayPlusIndexDays = new Date();
        todayPlusIndexDays.setDate(todayPlusIndexDays.getDate() + index + 1);
        return todayPlusIndexDays;
    };

    const updateAll = (parallel: number, property: keyof VerfuebarkeitTestzentrumDto) => {
        for (let i = 0; i < showDays; i++) {
            updateState(i, property, parallel);
        }
    };

    const getVerfuebarkeitTable = () => {
        const rows = [];
        for (let i = 0; i < showDays; i++) {
            rows.push(<>
                <span>{getDate(i).toLocaleDateString('de-DE', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                })}</span>
                <div>
                    <label>Von: </label>
                    <Calendar timeOnly={true} showTime={true} hourFormat="24"
                              value={!!verfuegbarkeit[i].fromUnixTimeStamp && new Date(verfuegbarkeit[i].fromUnixTimeStamp * 1000)}
                              onChange={(event) => updateState(i, 'fromUnixTimeStamp', (event.value as Date).getTime() / 1000)}>
                    </Calendar>
                </div>
                <div>
                    <label>Bis: </label>
                    <Calendar timeOnly={true} showTime={true} hourFormat="24"
                              value={!!verfuegbarkeit[i].toUnixTimeStamp && new Date(verfuegbarkeit[i].toUnixTimeStamp * 1000)}
                              onChange={(event) => updateState(i, 'toUnixTimeStamp', (event.value as Date).getTime() / 1000)}>
                    </Calendar>
                </div>
            </>)
        }
        return rows;
    };

    return (
        <>
            <h1>Behandlungszeiträume</h1>
            <div className={"button-container"}>
                <p>Verfügbarkeit</p>
                <Button onClick={handleSubmit} label={"Speichern"}/>
            </div>
            <div className={"grid"}>
                {getVerfuebarkeitTable()}
            </div>
            <div className={"bottom-container"}>
                <span>Anzahl der Personen, die gleichzeitig Test durchführen können</span>
                <div>
                    <InputText onChange={(event => updateAll(parseInt(event.currentTarget.value), 'parallel'))}/>
                    <label> Personen</label>
                </div>
                <span>Zeit pro Patient</span>
                <div>
                    <InputText onChange={(event => updateAll(parseInt(event.currentTarget.value), 'slotDurationMinutes'))}/>
                    <label> Minuten</label>
                </div>
            </div>
            <Growl ref={(el) => setGrowl(el)}/>
        </>
    );
};
