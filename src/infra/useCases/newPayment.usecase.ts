import ApiURI from '../core/apiURI';
import { HttpService } from '../services/HTTP.service';
import { IHTTPService } from '../services/interfaces/IHTTPService';
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
