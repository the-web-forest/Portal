export default interface INewPaymentRequest {
  trees: {
    id: string;
    quantity: number;
  }[];
  cardToken?: string;
}
