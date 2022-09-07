export default class Settings {
  public static APP_NAME = 'Portal - Web Forest';
  public static APP_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  public static FACEBOOK_URL = 'https://facebook.com/webforesteco';
  public static INSTAGRAM_URL = 'https://www.instagram.com/webforesteco';
  public static LINKEDIN_URL = 'https://www.linkedin.com/company/77021618';
  public static CONTACT_EMAIL = 'contato@webforest.eco';
  public static FORUM_URL = 'https://www.reddit.com/r/webforest/';
  public static PAGSEGURO_PUBLIC_KEY =
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr+ZqgD892U9/HXsa7XqBZUayPquAfh9xx4iwUbTSUAvTlmiXFQNTp0Bvt/5vK2FhMj39qSv1zi2OuBjvW38q1E374nzx6NNBL5JosV0+SDINTlCG0cmigHuBOyWzYmjgca+mtQu4WczCaApNaSuVqgb8u7Bd9GCOL4YJotvV5+81frlSwQXralhwRzGhj/A57CGPgGKiuPT+AOGmykIGEZsSD9RKkyoKIoc0OS8CPIzdBOtTQCIwrLn2FxI83Clcg55W8gkFSOS6rWNbG5qFZWMll6yl02HtunalHmUlRUL66YeGXdMDC2PuRcmZbGO5a/2tbVppW6mfSWG3NPRpgwIDAQAB';

  public static isProduction(): boolean {
    return process.env.NEXT_PUBLIC_APP_ENV == 'production';
  }

  public static isDevelopment(): boolean {
    return process.env.NEXT_PUBLIC_APP_ENV == `development`;
  }

  public static getGoogleTagKey(): string {
    return process.env.NEXT_PUBLIC_GOOGLE_TAG_KEY!;
  }

  public static getApiUrl(): string {
    return process.env.NEXT_PUBLIC_API_URL!;
  }
}
