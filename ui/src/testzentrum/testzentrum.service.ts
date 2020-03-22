import { HttpService } from '../service/http.service';
import { TestzentrumDto } from './testzentrum.dto';
import { VerfuebarkeitTestzentrumDto } from './verfuebarkeit-testzentrum.dto';

export class TestzentrumService {
    constructor(private readonly httpService: HttpService = new HttpService()) {
    }

    async addNewTestzentrum(testzentrumDto: TestzentrumDto) {
        const response = await this.httpService.post('api/testzentrum', testzentrumDto);
        return response.data as TestzentrumDto;
    }

    async addVerfuegbarkeitTestzentrum(testzentrumId: string, verfuebarkeitTestzentrumDto: VerfuebarkeitTestzentrumDto): Promise<void> {
        await this.httpService.put(`api/testzentrum/${testzentrumId}`, verfuebarkeitTestzentrumDto);
    }
}
