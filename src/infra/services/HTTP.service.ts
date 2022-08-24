import { AxiosResponse } from 'axios';
import { CachiosInstance, CachiosRequestConfig } from 'cachios';
import { api } from '../core/api';
import { IHTTPService } from './interfaces/IHTTPService';

export class HttpService implements IHTTPService {
  private api: CachiosInstance;

  constructor() {
    this.api = api;
  }

  async get<O>(url: string, params: any, ttl = 0): Promise<O> {
    const config: CachiosRequestConfig = {
      params: params,
      ttl: ttl,
    };

    return this.api.get(url, config).then(({ data }) => data);
  }

  async post<I, O>(url: string, data: I): Promise<O> {
    return this.api
      .post<I, AxiosResponse<O>>(url, data)
      .then(({ data }) => data);
  }

  async put<I, O>(url: string, data: I): Promise<O> {
    return this.api
      .put<I, AxiosResponse<O>>(url, data)
      .then(({ data }) => data);
  }

  async delete<O>(url: string): Promise<O> {
    return this.api.delete(url).then(({ data }) => data);
  }
}
