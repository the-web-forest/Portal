import ApiURI from '../core/apiURI';
import IActiveBiomesResponse from '../dtos/Biomes/ActiveBiomesResponse.dto';
import { HttpService } from '../services/HTTP.service';
import { IHTTPService } from '../services/interfaces/IHTTPService';

export default class GetBiomesUseCase {
  private readonly httpService: IHTTPService;

  constructor() {
    this.httpService = new HttpService();
  }
  async run(requiredTotal: boolean = true): Promise<string[]> {
    const response = await this.httpService.get<IActiveBiomesResponse>(
      `${ApiURI.Trees.biomes.active}`,
    );
    return response.biomes;
  }
}
