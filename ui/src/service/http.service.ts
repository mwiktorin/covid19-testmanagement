import Axios, {AxiosResponse} from "axios";

const host = `http://localhost:5000/`;

export class HttpService {
    async get<T>(url: string): Promise<{ data: T }> {
        return await Axios.get(url);
    }

    async post<T>(url: string, data: T): Promise<AxiosResponse> {
        return await Axios.post(`${host}${url}`, data);
    }

    async put<T>(url: string, data: T): Promise<AxiosResponse<T>> {
        return await Axios.put(`${host}${url}`, data);
    }

    async delete(url: string) {
        return await Axios.delete(`${host}${url}`);
    }

    async patch(url: string, data: any) {
        return await Axios.patch(`${host}${url}`, data);
    }
}
