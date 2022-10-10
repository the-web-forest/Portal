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
    const reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(value.toLocaleLowerCase());
  }

  public static isAValidUserName(name: string): boolean {
    const regName = /[^a-zà-ú]/gi;
    if (name === undefined || name === "" || !regName.test(name.trim()))
      return false;
      
    return true;
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
