import ApiURI from '../core/apiURI';
import { HttpService } from '../services/HTTP.service';
import { IHTTPService } from '../services/interfaces/IHTTPService';

type Response = {
  status: string;
};

export default class ValidateEmaillUseCase {
  private readonly httpService: IHTTPService;

  constructor() {
    this.httpService = new HttpService();
  }

  async run(email: string, token: string): Promise<boolean> {
    return !!(
      await this.httpService.post<any, Response>(
        `${ApiURI.User.validateEmail}`,
        { email, token, role: 'User' },
      )
    ).status;
  }
}
