export default interface ISignupData {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly confirm: string;
  readonly terms: boolean | string;
}
