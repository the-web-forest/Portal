import UserEntity from '../../entities/UserEntity';

export default interface ILoginResponseDTO {
  accessToken: string;
  tokenType: string;
  user: UserEntity;
}
