import { IAppError } from './AppError'

export default interface ErrorList {
  [key: string]: IAppError
  default: IAppError
}