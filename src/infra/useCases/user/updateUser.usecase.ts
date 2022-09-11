import IMyAccountData from '../../../validations/DTO/IMyAccountData';
import ApiURI from '../../core/apiURI';
import IUserUpdateDataRequest from '../../dtos/User/IUserUpdateDataRequest';
import IUserUpdateDataResponse from '../../dtos/User/IUserUpdateDataResponse';
import { HttpService } from '../../services/HTTP.service';
import { IHTTPService } from '../../services/interfaces/IHTTPService';

export default class UpdateUserUseCase {
  private readonly httpService: IHTTPService;
  constructor() {
    this.httpService = new HttpService();
  }

  async run(formData: IMyAccountData): Promise<boolean> {
    const payload: Omit<IMyAccountData, 'email'> = formData;
    const response = await this.httpService.put<
      IUserUpdateDataRequest,
      IUserUpdateDataResponse
    >(ApiURI.User.index, payload);
    return response.updated;
  }
}
