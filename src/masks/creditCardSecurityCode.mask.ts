const creditCardSecurityCode = (code: string) => {
  return code.replace(/\D/g, '');
};

export default creditCardSecurityCode;
