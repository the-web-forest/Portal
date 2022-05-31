import ISignupData from './DTO/ISignupData';

export default class SignUpFormValidade {
  private errors: ISignupData = {} as ISignupData;

  async validate(formData: ISignupData): Promise<ISignupData> {
    !formData.name &&
      Object.assign(this.errors, {
        name: 'Nome é obrigatório',
      });

    !formData.email &&
      Object.assign(this.errors, {
        email: 'Email é obrigatório',
      });

    !formData.state &&
      Object.assign(this.errors, {
        state: 'Estado é obrigatório',
      });

    !formData.city &&
      Object.assign(this.errors, {
        city: 'Cidade é obrigatória',
      });

    !formData.password &&
      Object.assign(this.errors, {
        password: 'Senha é obrigatória',
      });

    return this.errors;
  }
}
