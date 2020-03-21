export class PatientDto {
    constructor(public nachname: string,
                public vorname: string,
                public geburtsdatum: string,
                public versicherungsnummer: string,
                public email: string,
                public telefonnummer: string,
                public anschrift: string,
                public plz: string,
                public emailChecked: boolean,
                public smsChecked: boolean,
                public telefonChecked: boolean,
                public uuid = "") {
    }
}
