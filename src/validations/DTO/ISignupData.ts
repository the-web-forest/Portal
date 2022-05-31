export default interface ISignupData {
  readonly name: string;
  readonly email: string;
  readonly state: string;
  readonly city: string;
  readonly password: string;
  readonly confirm: string;
}
