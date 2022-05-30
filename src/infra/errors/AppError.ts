export interface IAppError {
  code: string;
  message: string;
  shortMessage: string;
}

export default class AppError extends Error implements IAppError {
  constructor(
    readonly code: string,
    readonly message: string,
    readonly shortMessage: string,
  ) {
    super(message);
  }
}
