import ApiURI from '../core/apiURI';
import ApiErrors from '../errors/ApiErrors';
import SendEmailToValidateError from '../errors/SendEmailToValidateErrors';
import { HttpService } from '../services/HTTP.service';
import { IHTTPService } from '../services/interfaces/IHTTPService';

type Response = {
  send: boolean;
};

type DataBody = {
  email: string;
};

export default class SendEmailToValidateEmailUseCase {
  private readonly httpService: IHTTPService;

  constructor() {
    this.httpService = new HttpService();
  }

  async run(email: string): Promise<boolean> {
    try{
      const data: DataBody = { email };
      return (
        await this.httpService.post<DataBody, Response>(
          `${ApiURI.User.sendValidationEmail}`,
          data,
        )
      ).send;
    } catch(error : any){
      const data = error.response.data;
      if(data == undefined){
        console.error('Unknow Error:', error);
      }
      throw new ApiErrors(SendEmailToValidateError).getError(data.Code);
    }
  }
}
