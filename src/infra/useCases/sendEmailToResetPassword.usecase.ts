import ApiURI from '../core/apiURI';
import ApiErrors from '../errors/ApiErrors';
import passwordChangeError from '../errors/PasswordChangeErrors';
import { HttpService } from '../services/HTTP.service';
import { IHTTPService } from '../services/interfaces/IHTTPService';

type Response = {
  send: boolean;
};

type DataBody = {
  email: string;
};

export default class SendEmailToResetPasswordUseCase {
  private readonly httpService: IHTTPService;

  constructor() {
    this.httpService = new HttpService();
  }

  async run(email: string): Promise<boolean> {
    try {
      const data: DataBody = { email };
      return (
        await this.httpService.post<DataBody, Response>(
          `${ApiURI.User.resetPassword}`,
          data,
        )
      ).send;
    } catch (error: any) {
      const data = error.response.data;
      if (data == undefined) {
        console.error('Unknow Error:', error);
      }
      throw new ApiErrors(passwordChangeError).getError(data.Code);
    }
  }
}
