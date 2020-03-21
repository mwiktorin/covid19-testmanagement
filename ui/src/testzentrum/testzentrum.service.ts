import { HttpService } from '../service/http.service';
import { TestzentrumDto } from './testzentrum.dto';

export class TestzentrumService {
    constructor(private readonly httpService: HttpService = new HttpService()) {
    }

    async addNewTestzentrum(testzentrumDto: TestzentrumDto) {
        const response = await this.httpService.post('api/testzentrum', testzentrumDto);
        return response.data as TestzentrumDto;
    }
}
