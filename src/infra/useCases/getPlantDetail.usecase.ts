import ApiURI from '../core/apiURI';
import IPlantDetailResponse from '../dtos/Plant/IPlantDetail.dto';
import { HttpService } from '../services/HTTP.service';
import { IHTTPService } from '../services/interfaces/IHTTPService';

export default class GetPlantDetailUseCase {
  private readonly httpService: IHTTPService;

  constructor() {
    this.httpService = new HttpService();
  }
  async run(plantId: string): Promise<IPlantDetailResponse> {
    const response = await this.httpService.get<IPlantDetailResponse>(
      `${ApiURI.Plant.detail.replace('{plantId}', plantId)}`,
    );
    return response;
  }
}
