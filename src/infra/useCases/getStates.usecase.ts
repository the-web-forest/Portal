import AppPaths from '../core/appPaths';
import IStatesResponse from '../dtos/States/IStatesResponse.dto';
import { HttpService } from '../services/HTTP.service';
import { IHTTPService } from '../services/interfaces/IHTTPService';

export default class GetStatesUseCase {
  private readonly httpService: IHTTPService;

  constructor() {
    this.httpService = new HttpService();
  }
  async run(): Promise<IStatesResponse> {
    return this.httpService.get<IStatesResponse>(AppPaths.States);
  }
}
