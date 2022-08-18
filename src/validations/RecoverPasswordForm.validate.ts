import { StrUtils } from '../utils/str-utils';
import INewPasswordData from './DTO/INewPasswordData';

export default class RecoverPasswordValidate {
  private errors: INewPasswordData = {} as INewPasswordData;

  async validate(formData: INewPasswordData): Promise<INewPasswordData> {
    !StrUtils.hasEightChars(formData.password) &&
      Object.assign(this.errors, {
        password: 'Informe uma senha com mais de 8 caracteres',
      });

    !formData.password &&
      Object.assign(this.errors, {
        password: 'Senha é obrigatória',
      });

    !formData.confirm &&
      Object.assign(this.errors, {
        confirm: 'A confirmação da senha é obrigatoria',
      });

    !StrUtils.hasEightChars(formData.confirm) &&
      Object.assign(this.errors, {
        confirm: 'Informe uma senha com mais de 8 caracteres',
      });
    return this.errors;
  }
}
