const creditCardExpirationMask = (date: string): string => {
  const cleanDate = date.replace(/\D/g, '');

  if (cleanDate.length <= 2) {
    return cleanDate;
  }

  const firstPart = cleanDate.slice(0, 2);
  const lastPart = cleanDate.slice(2, cleanDate.length);

  return `${firstPart}/${lastPart}`;
};

export default creditCardExpirationMask;
