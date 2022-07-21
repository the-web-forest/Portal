import ApiURI from '../core/apiURI';
import { HttpService } from '../services/HTTP.service';
import { IHTTPService } from '../services/interfaces/IHTTPService';
import ISignupData from '../../validations/DTO/ISignupData';
import ISignupDataRequest from '../dtos/Signup/ISignupDataRequest.dto';
import ISignupDataResponse from '../dtos/Signup/ISignupDataResponse.dto';
import ApiErrors from '../errors/ApiErrors';
import registerError from '../errors/RegisterErrors';

export default class RegisterUserUseCase {
  private readonly httpService: IHTTPService;
  constructor() {
    this.httpService = new HttpService();
  }

  async run(formData: ISignupData): Promise<boolean> {
    try {
      const payload: Omit<ISignupData, 'confirm'> = formData;
      const response = await this.httpService.post<
        ISignupDataRequest,
        ISignupDataResponse
      >(ApiURI.User.index, payload);
      return response.registered;
    } catch (error: any) {
      const { data } = error.response;
      if (data === undefined) {
        console.error('Unknow Error:', error);
      }
      throw new ApiErrors(registerError).getError(data.Code);
    }
  }
}
