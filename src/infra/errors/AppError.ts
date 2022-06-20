export interface IAppError {
  code: string;
  message: string;
}

export default class AppError extends Error{
  constructor(
   readonly error: IAppError
  ) {
    super(error.message);
  }
}
