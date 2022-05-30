import AppPaths from '../core/appPaths';
import { HttpService } from '../services/HTTP.service';
import { IHTTPService } from '../services/interfaces/IHTTPService';
import ISignupData from '../../validations/DTO/ISignupData';
import AppError from '../errors/AppError';
import ISignupDataRequest from '../dtos/Signup/ISignupDataRequest.dto';
import ISignupDataResponse from '../dtos/Signup/ISignupDataResponse.dto'

export default class RegisterUserUseCase {
  private readonly httpService: IHTTPService;
  constructor() {
    this.httpService = new HttpService();
  }

  async run(formData: ISignupData): Promise<boolean> {
    try {
      const payload: Omit<ISignupData, 'confirm'> = formData;
      const response = await this.httpService.post<ISignupDataRequest, ISignupDataResponse>(
        AppPaths.User,
        payload,
      )
      console.log(response)
      return response.registered;
    } catch (error: any) {
      if (error.response.data) {
        const { data } = error.response;
        const code = data.Code;
        const message = data.Message;
        const shortMessage = data.ShortMessage;
        throw new AppError(code, message, shortMessage);
      }
      throw error;
    }
  }
}
