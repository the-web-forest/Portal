import IUserInfoResponseDTO from '../../infra/dtos/User/IUserInfoResponse.dto';
import { StrUtils } from '../../utils/str-utils';

export default class UpdateUserFormValidate {
  private errors: IUserInfoResponseDTO = {} as IUserInfoResponseDTO;

  async validate(
    formData: IUserInfoResponseDTO,
    formCurrentErrors: IUserInfoResponseDTO,
  ): Promise<IUserInfoResponseDTO> {
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

    return this.errors;
  }
}
