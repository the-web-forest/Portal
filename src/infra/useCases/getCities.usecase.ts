import ApiURI from '../core/apiURI';
import ICitiesResponse from '../dtos/States/ICitiesResponse.dto';
import { HttpService } from '../services/HTTP.service';
import { IHTTPService } from '../services/interfaces/IHTTPService';

export default class GetCitiesUseCase {
  private readonly httpService: IHTTPService;

  constructor() {
    this.httpService = new HttpService();
  }
  async run(state: string): Promise<ICitiesResponse> {
    const response = await this.httpService.get<ICitiesResponse>(
      `${ApiURI.States}/${state}${ApiURI.Cities}`,
    );
    console.log(response);
    return response;
  }
}
