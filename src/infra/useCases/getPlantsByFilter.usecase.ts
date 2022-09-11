import ApiURI from '../core/apiURI';
import IPlantResponseDTO from '../dtos/Plant/IPlantResponse.dto';
import { HttpService } from '../services/HTTP.service';
import { IHTTPService } from '../services/interfaces/IHTTPService';

export default class GetPlantsByFilterUseCase {
  private readonly httpService: IHTTPService;

  constructor() {
    this.httpService = new HttpService();
  }
  async run(
    name: string,
    take: number,
    skip: number,
    total: boolean,
  ): Promise<IPlantResponseDTO> {
    const response = await this.httpService.get<IPlantResponseDTO>(
      `${ApiURI.Plant.index}`,
      {
        name,
        take,
        skip,
        requiredTotal: total,
      },
    );
    return response;
  }
}
