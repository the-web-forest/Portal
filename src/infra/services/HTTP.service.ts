import { AxiosInstance } from 'axios';
import { api } from '../core/api';
import { IHTTPService } from './interfaces/IHTTPService';

export class HttpService implements IHTTPService {
  private api: AxiosInstance;

  constructor() {
    this.api = api;
  }

  async get<O>(url: string): Promise<O> {
    return this.api.get(url).then(({ data }) => data);
  }

  async post<I, O>(url: string, data: I): Promise<O> {
    return this.api.post<O>(url, data).then(({ data }) => data);
  }

  async put<I, O>(url: string, data: I): Promise<O> {
    return this.api.put<O>(url, data).then(({ data }) => data);
  }

  async delete<O>(url: string): Promise<O> {
    return this.api.delete(url).then(({ data }) => data);
  }
}
