export class StrUtils {
  public static hasUppercase(value: string): boolean {
    return value?.toLowerCase() != value;
  }

  public static hasEightChars(value: string): boolean {
    return value?.length >= 8;
  }
  public static hasExactCharQuantity(value: string, quantity: number): boolean {
    return value?.length >= quantity;
  }

  public static isEmailValid(value: string): boolean {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return reg.test(value);
  }

  public static isAValidUserName(name: string): boolean {
    const regName = /[^a-zà-ú]/gi;
    return regName.test(name);
  }

  public static formatCurrency(value: number): string {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  public static unformatCurrency(value: string): number {
    return value ? Number(value.replace(/\D/g, '')) / 100 : 0;
  }
}
