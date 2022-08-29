const luhnck = (val: string) => {
  let validsum = 0;
  let k = 1;
  for (let l = val.length - 1; l >= 0; l--) {
    let calck = 0;
    calck = Number(val.charAt(l)) * k;
    if (calck > 9) {
      validsum = validsum + 1;
      calck = calck - 10;
    }
    validsum = validsum + calck;
    if (k == 1) {
      k = 2;
    } else {
      k = 1;
    }
  }
  return validsum % 10 == 0;
};

export default class CreditCardUtils {
  static validCardNumber(cardNumber: string): boolean {
    const regex = /^\d{13,19}$/;

    if (!regex.test(cardNumber)) {
      return false;
    }
    return luhnck(cardNumber);
  }
}
