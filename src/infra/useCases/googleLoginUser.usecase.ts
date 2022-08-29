import { HttpService } from '../services/HTTP.service';
import { IHTTPService } from '../services/interfaces/IHTTPService';
import ILoginResponseDTO from '../dtos/Login/ILoginResponse.dto';
import ApiURI from '../core/apiURI';
import ApiErrors from '../errors/ApiErrors';
import loginError from '../errors/LoginErrors';
import IGoogleLoginData from '../../validations/DTO/IGoogleLoginData';

export default class GoogleLoginUserUseCase {
  private readonly httpService: IHTTPService;
  constructor() {
    this.httpService = new HttpService();
  }

  async run(googleToken: string): Promise<ILoginResponseDTO> {
    const formData: IGoogleLoginData = {
      token: googleToken,
    };

    try {
      return await this.httpService.post<IGoogleLoginData, ILoginResponseDTO>(
        ApiURI.User.login.google,
        formData,
      );
    } catch (error: any) {
      const { data } = error.response;
      if (data === undefined) {
        console.error('Unknow Error:', error);
      }
      throw new ApiErrors(loginError).getError(data.Code);
    }
  }
}
