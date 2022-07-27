import ApiURI from '../core/apiURI';
import { HttpService } from '../services/HTTP.service';
import { IHTTPService } from '../services/interfaces/IHTTPService';

type Response = {
  send: boolean;
};

type DataBody = {
  email : string;
}

export default class SendEmailToResetPasswordUseCase {
  private readonly httpService: IHTTPService;

  constructor() {
    this.httpService = new HttpService();
  }

  async run(email : string): Promise<boolean> {
    const data : DataBody = {email};
    return (
      await this.httpService.post<DataBody,Response>(`${ApiURI.User.resetPassword}`, data)
    ).send;
  }
}
