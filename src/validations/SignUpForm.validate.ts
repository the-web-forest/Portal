import { StrUtils } from '../utils/str-utils';
import ISignupData from './DTO/ISignupData';

export default class SignUpFormValidade {
  private errors: ISignupData = {} as ISignupData;

  async validate(
    formData: ISignupData,
    formCurrentErrors: ISignupData,
  ): Promise<ISignupData> {
    !formData.name &&
      Object.assign(this.errors, {
        name: 'Nome é obrigatório',
      });

    !StrUtils.isAValidUserName(formData.name) &&
      Object.assign(this.errors, {
        name: 'Nome inválido',
      });

    if (formCurrentErrors.email == null) {
      !formData.email &&
        Object.assign(this.errors, {
          email: 'Email é obrigatório',
        });
    } else {
      Object.assign(this.errors, {
        email: formCurrentErrors.email,
      });
    }

    !formData.state &&
      Object.assign(this.errors, {
        state: 'Estado é obrigatório',
      });

    !formData.city &&
      Object.assign(this.errors, {
        city: 'Cidade é obrigatória',
      });

    formData.confirm !== formData.password &&
      Object.assign(this.errors, {
        password: 'As senhas informadas não são iguais.',
        confirm: 'As senhas informadas não são iguais.',
      });

    !StrUtils.hasUppercase(formData.password) &&
      Object.assign(this.errors, {
        password: 'A senha digitada não tem uma letra maiúscula.',
      });

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
        confirm: 'A confirmação de senha é obrigatória.',
      });

    return this.errors;
  }
}
