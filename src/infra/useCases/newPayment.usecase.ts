import ApiURI from '../core/apiURI';
import IPasswordChangeRequest from '../dtos/PasswordChange/IPasswordChangeRequest.dto';
import IPasswordChangeResponse from '../dtos/PasswordChange/IPasswordChangeResponse.dto';
import ApiErrors from '../errors/ApiErrors';
import { HttpService } from '../services/HTTP.service';
import { IHTTPService } from '../services/interfaces/IHTTPService';
import passwordChangeError from '../errors/PasswordChangeErrors';
import INewPasswordData from '../../validations/DTO/INewPasswordData';
import IPaymentData from '../../validations/DTO/IPaymentData';
import INewPaymentRequest from '../dtos/NewPayment/INewPaymentRequest.dto';
import { CartItem } from '../../utils/cart-utils';
import INewPaymentResponse from '../dtos/NewPayment/INewPaymentResponse.dto';

export default class NewPaymentUseCase {
  private readonly httpService: IHTTPService;
  constructor() {
    this.httpService = new HttpService();
  }

  async run(items: CartItem[], cardToken: string): Promise<string> {
    const requestBody: INewPaymentRequest = {
      trees: [],
      cardToken: cardToken,
    };

    items.forEach(item => {
      requestBody.trees.push({
        id: item.getId(),
        quantity: item.getQuantity(),
      });
    });

    const response = await this.httpService.post<
      INewPaymentRequest,
      INewPaymentResponse
    >(ApiURI.Plant, requestBody);

    if (!response.planted || !response.orderId) {
      throw new Error('Error on Plant');
    }

    return response.orderId;
  }
}
