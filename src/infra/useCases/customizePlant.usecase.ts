import IPlantCustomizeData from '../../validations/DTO/IPlantCustomizeData';
import ApiURI from '../core/apiURI';
import { HttpService } from '../services/HTTP.service';
import { IHTTPService } from '../services/interfaces/IHTTPService';

export default class CustomizePlantUseCase {
  private readonly httpService: IHTTPService;

  constructor() {
    this.httpService = new HttpService();
  }
  async run(data: IPlantCustomizeData): Promise<any> {
    const response = await this.httpService.post<IPlantCustomizeData, any>(
      ApiURI.Plant.customize,
      data,
    );
    return response;
  }
}
