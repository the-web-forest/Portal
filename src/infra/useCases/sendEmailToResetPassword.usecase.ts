import ApiURI from '../core/apiURI';
import { HttpService } from '../services/HTTP.service';
import { IHTTPService } from '../services/interfaces/IHTTPService';

type Response = {
  send: boolean;
};

export default class SendEmailToResetPasswordUseCase {
  private readonly httpService: IHTTPService;

  constructor() {
    this.httpService = new HttpService();
  }

  async run(): Promise<boolean> {
    return (
      await this.httpService.get<Response>(`${ApiURI.User.resetPassword}`)
    ).send;
  }
}
