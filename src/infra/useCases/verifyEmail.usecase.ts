import ApiURI from '../core/apiURI';
import ApiErrors from '../errors/ApiErrors';
import SendEmailToValidateError from '../errors/SendEmailToValidateErrors';
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
    try{
      const response = await this.httpService.get<Response>(
        `${ApiURI.User.verifyEmail}?email=${email}`,
      );
      return !!(response.status);
    }
    catch(error : any){
      const { data } = error.response;
      if(data === undefined){
        console.error('Unknow Error:', error);
      }
      console.log(data)
      throw new ApiErrors(SendEmailToValidateError).getError(data.Code);
    }
    
  }
}
