import React, { useEffect } from "react";
import { Checkbox } from 'primereact/checkbox';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import "./verfuegbarkeit-testzentrum.comp.css"

export const VerfuegbarkeitTestzentrum = (props: any) => {

    const wochentage = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
    useEffect(() => console.log(props.match.params.id));

    return (
        <>
            <h1>Terminvergabe</h1>
            <p>Verfügbarkeit</p>
            <div className={"grid"}>
                {wochentage.map(tag => (
                    <>
                        <div>
                            <Checkbox inputId={`check-${tag}`}/>
                            <label htmlFor={`check-${tag}`} className="p-checkbox-label">{tag}</label>
                        </div>
                        <div>
                            <label>Von: </label>
                            <Calendar timeOnly={true} showTime={true} hourFormat="24">
                            </Calendar>
                        </div>
                        <div>
                            <label>Bis: </label>
                            <Calendar timeOnly={true} showTime={true} hourFormat="24">
                            </Calendar>
                        </div>
                        <div>&</div>
                        <div>
                            <label>Von: </label>
                            <Calendar timeOnly={true} showTime={true} hourFormat="24">
                            </Calendar>
                        </div>
                        <div>
                            <label>Bis: </label>
                            <Calendar timeOnly={true} showTime={true} hourFormat="24">
                            </Calendar>
                        </div>
                    </>
                ))}
            </div>
            <div className={"bottom-container"}>
                <span>Anzahl der Personen, die gleichzeitig Test durchführen können</span>
                <div>
                    <InputText/>
                    <label> Personen</label>
                </div>
                <span>Zeit pro Patient</span>
                <div>
                    <InputText/>
                    <label> Minuten</label>
                </div>
            </div>
        </>
    );
};
