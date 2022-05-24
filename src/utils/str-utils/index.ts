export class StrUtils {
  public static hasUppercase(value: string): boolean {
    return value?.toLowerCase() != value;
  }

  public static hasSixChars(value: string): boolean {
    return value?.length >= 6;
  }
}
