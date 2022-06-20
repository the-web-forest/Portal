import ErrorCode from './ErrorCodes'
import ErrorList from './IErrorList'

const registerError: ErrorList = {
  [ErrorCode.emailAlreadyRegistered]: { code: ErrorCode.emailAlreadyRegistered, message: 'E-mail já registrado.'},
  default: {code: ErrorCode.unhadleError, message: 'Erro interno.'}
}

export default registerError