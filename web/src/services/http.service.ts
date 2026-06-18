import axios, { type AxiosInstance } from "axios";

export class HttpService {
  private baseUrl: string;
  private instance: AxiosInstance;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.instance = axios.create({ baseURL: this.baseUrl });
  }

  public async get<T>(url: string): Promise<T> {
    const response = await this.instance.get<T>(url);

    return response.data;
  }
}
