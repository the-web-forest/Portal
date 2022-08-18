const creditCardMask = (cardNumber: string): string => {
  let cardNumberOnlyNumer = cardNumber.replace(/\D/g, '');

  const cardNumberMasked =
    cardNumberOnlyNumer
      .match(/.{1,4}/g)
      ?.join(' ')
      .toString() || '';

  return cardNumberMasked;
};

export default creditCardMask;
