export default interface INewPasswordData {
  readonly password: string;
  readonly confirm: string;
  readonly email: string | undefined;
  readonly token: string | undefined;
}
