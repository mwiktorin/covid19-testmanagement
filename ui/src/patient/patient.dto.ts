export class PatientDto {
    constructor(private nachname: string,
                private vorname: string,
                private telefonnummer: string,
                private anschrift: string,
                private plz: string,
                private uuid = "") {
    }
}
