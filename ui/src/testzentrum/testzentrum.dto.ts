export class TestzentrumDto {
    constructor(public name: string,
                public telefonnummer: string,
                public anschrift: string,
                public plz: string,
                public uuid = "") {
    }
}
