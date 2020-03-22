import {TestzentrumDto} from "./testzentrum.dto";

export class TestBeantragenResponseDto {
    constructor(public testCenter: TestzentrumDto,
                public when: number) {
    }
}
