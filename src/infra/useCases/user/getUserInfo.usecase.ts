import ApiURI from '../../core/apiURI';
import IUserInfoResponseDTO from '../../dtos/User/IUserInfoResponse.dto';
import { HttpService } from '../../services/HTTP.service';
import { IHTTPService } from '../../services/interfaces/IHTTPService';

export default class GetUserInfoUseCase {
  private readonly httpService: IHTTPService;

  constructor() {
    this.httpService = new HttpService();
  }
  async run(): Promise<IUserInfoResponseDTO> {
    return this.httpService.get<IUserInfoResponseDTO>(ApiURI.User.index);
  }
}
