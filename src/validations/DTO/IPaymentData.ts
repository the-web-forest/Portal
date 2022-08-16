export default interface IPaymentData {
  readonly name: string;
  readonly cardNumber: string;
  readonly cardExpiration: string;
  readonly cardCvv: string;
}
