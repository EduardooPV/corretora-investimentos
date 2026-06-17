import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CoreHttpService {
  constructor(private readonly http: HttpService) {}

  async get<T>(url: string): Promise<T> {
    const response = await firstValueFrom(this.http.get<T>(url));
    return response.data;
  }
}
