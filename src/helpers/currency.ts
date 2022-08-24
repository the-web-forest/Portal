export default class CurrencyHelper {
  static mascaraMoeda(inCents: string) {
    const inDecimal = Number(inCents) / 100;
    return inDecimal.toFixed(2).replace('.', ',');
  }
}
