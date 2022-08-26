import ApiURI from '../core/apiURI';
import ITreesResponseDTO from '../dtos/Trees/ITreesResponse.dto';
import { HttpService } from '../services/HTTP.service';
import { IHTTPService } from '../services/interfaces/IHTTPService';

export default class GetTreesByBiomeUseCase {
  private readonly httpService: IHTTPService;

  constructor() {
    this.httpService = new HttpService();
  }
  async run(
    biome: string,
    take: number,
    skip: number,
    total: boolean,
  ): Promise<ITreesResponseDTO> {
    const response = await this.httpService.get<ITreesResponseDTO>(
      `${ApiURI.Trees.index}`,
      {
        biome,
        take,
        skip,
        requiredTotal: total,
      },
    );
    return response;
  }
}
