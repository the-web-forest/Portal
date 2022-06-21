import ApiURI from '../core/apiURI';
import { HttpService } from '../services/HTTP.service';
import { IHTTPService } from '../services/interfaces/IHTTPService';

type Response = {
  status: string;
};

export default class VerifyEmailUseCase {
  private readonly httpService: IHTTPService;

  constructor() {
    this.httpService = new HttpService();
  }

  async run(email: string): Promise<boolean> {
    return !!(
      await this.httpService.get<Response>(
        `${ApiURI.User.verifyEmail}?email=${email}`,
      )
    ).status;
  }
}
