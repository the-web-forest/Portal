import { StrUtils } from '../utils/str-utils';
import ILoginData from './DTO/ILoginData';

export default class LoginFormValidate {
  private errors: ILoginData = {} as ILoginData;

  async validate(formData: ILoginData): Promise<ILoginData> {
    !formData.email &&
      Object.assign(this.errors, {
        email: 'Email é obrigatório',
      });

    (!formData.password || !StrUtils.hasEightChars(formData.password)) &&
      Object.assign(this.errors, {
        password: 'Senha é obrigatória',
      });

    return this.errors;
  }
}
