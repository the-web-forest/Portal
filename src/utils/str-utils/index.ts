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
    const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return reg.test(value);
  }

  public static isAValidUserName(name: string): boolean {
    const regName = /[^a-zà-ú]/gi;
    return regName.test(name);
  }
}
