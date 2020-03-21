import {HttpService} from "../service/http.service";
import {PatientDto} from "./patient.dto";

export class PatientService {

    constructor(private httpService: HttpService = new HttpService()) {
    }

    async addNewPatient(patientDto: PatientDto): Promise<PatientDto> {
        const response = await this.httpService.post('api/patient', patientDto);
        return response.data as PatientDto;
    }

}
