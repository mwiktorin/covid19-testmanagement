export class VerfuebarkeitTestzentrumDto {
    constructor(public parallel: number,
                public slotDurationMinutes: number,
                public fromUnixTimeStamp: number,
                public toUnixTimeStamp: number) {
    }
}
