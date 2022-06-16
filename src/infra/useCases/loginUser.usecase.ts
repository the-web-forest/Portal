import { HttpService } from '../services/HTTP.service';
import { IHTTPService } from '../services/interfaces/IHTTPService';
import ILoginData from '../../validations/DTO/ILoginData';
import ILoginResponseDTO from '../dtos/Login/ILoginResponse.dto';
import AppPaths from '../core/appPaths';
import ApiErrors from '../errors/ApiErrors';
import loginError from '../errors/LoginErrors';

export default class LoginUserUseCase {
  private readonly httpService: IHTTPService;
  constructor() {
    this.httpService = new HttpService();
  }

  async run(formData: ILoginData): Promise<ILoginResponseDTO> {
    try {
      return await this.httpService.post<ILoginData, ILoginResponseDTO>(
        AppPaths.User.login,
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
