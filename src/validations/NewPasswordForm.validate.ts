import { StrUtils } from '../utils/str-utils';
import INewPasswordData from './DTO/INewPasswordData';

export default class NewPasswordValidate {
  private errors: INewPasswordData = {} as INewPasswordData;

  async validate(formData: INewPasswordData): Promise<INewPasswordData> {
    (!formData.password || !StrUtils.hasEightChars(formData.password)) &&
      Object.assign(this.errors, {
        password: 'Senha é obrigatória',
      });

    (!formData.confirm || !StrUtils.hasEightChars(formData.confirm)) &&
      Object.assign(this.errors, {
        confirm: 'A confirmação da senha é obrigatoria',
      });
    !formData.token &&
      Object.assign(this.errors, {
        token: 'Token de acesso inválido',
      });
    !formData.email &&
      Object.assign(this.errors, {
        email: 'Dados de acesso inválidos',
      });
    return this.errors;
  }
}
