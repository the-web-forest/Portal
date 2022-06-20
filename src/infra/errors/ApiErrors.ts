import AppError from './AppError'
import ErrorCode from './ErrorCodes'
import ErrorList from './IErrorList'

export default class ApiErrors {
  constructor(
    private readonly error: ErrorList
  ){}

  getError(code: ErrorCode){
    return new AppError(this.error[code] || this.error.default)
  }
}