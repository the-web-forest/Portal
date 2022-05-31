export class StrUtils {
  public static hasUppercase(value: string): boolean {
    return value?.toLowerCase() != value;
  }

  public static hasEightChars(value: string): boolean {
    return value?.length >= 8;
  }

  public static isEmailValid(value: string): boolean {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return reg.test(value);
  }
}
