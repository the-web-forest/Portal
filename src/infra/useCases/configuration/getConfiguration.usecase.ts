import ApiURI from '../../core/apiURI';
import IConfigurationData from '../../dtos/Configuration/IConfigurationData';
import IConfigurationResponse from '../../dtos/Configuration/IConfigurationResponse';
import { HttpService } from '../../services/HTTP.service';
import { IHTTPService } from '../../services/interfaces/IHTTPService';

export default class GetConfigurationUseCase {
  private readonly httpService: IHTTPService;

  constructor() {
    this.httpService = new HttpService();
  }
  async run(): Promise<IConfigurationData> {
    const response = await this.httpService.get<IConfigurationResponse>(
      `${ApiURI.Configuration.index}`,
    );
    return JSON.parse(response.config) as IConfigurationData;
  }
}
