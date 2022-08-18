import CreditCardUtils from '../../utils/credit-card-utils';
import { StrUtils } from '../../utils/str-utils';
import IPaymentData from './IPaymentData';

export default class PaymentFormValidate {
  private errors: IPaymentData = {} as IPaymentData;

  async validate(formData: IPaymentData): Promise<IPaymentData> {
    if (!StrUtils.isAValidUserName(formData.name)) {
      Object.assign(this.errors, {
        name: 'Nome inválido',
      });
    }

    // if (!CreditCardUtils.validCardNumber(formData.cardNumber)) {
    //   Object.assign(this.errors, {
    //     cardNumber: 'Cartão de crédito inválido',
    //   });
    // }

    // EMPTY AREA

    if (!formData.name) {
      Object.assign(this.errors, {
        name: 'Preencha o nome conforme o cartão',
      });
    }

    if (!formData.cardNumber) {
      Object.assign(this.errors, {
        cardNumber: 'Preencha o número do cartão',
      });
    }

    if (!formData.cardExpiration) {
      Object.assign(this.errors, {
        cardExpiration: 'Preencha o vencimento do cartão',
      });
    }

    if (!formData.cardCvv) {
      Object.assign(this.errors, {
        cardCvv: 'Preencha o código de segurança',
      });
    }

    if (formData.cardExpiration) {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const cardExpirationSplitted = formData.cardExpiration.split('/');
      const cardMonth = cardExpirationSplitted[0];
      let cardYear = cardExpirationSplitted[1];

      if (cardYear.length == 2) {
        cardYear = `20${cardYear}`;
      }

      const invalidYear = Number(cardYear) < Number(currentYear);
      let invalidMonth = false;

      if (invalidYear) {
        invalidMonth = Number(cardMonth) < Number(currentMonth);
      }

      if (Number(cardMonth) > 12 || Number(cardMonth) < 1) {
        invalidMonth = true;
      }

      if (invalidYear) {
        Object.assign(this.errors, {
          cardExpiration: 'Vencimento inválido',
        });
      }

      if (!invalidYear && invalidMonth) {
        Object.assign(this.errors, {
          cardExpiration: 'Vencimento inválido',
        });
      }
    }

    return this.errors;
  }
}
