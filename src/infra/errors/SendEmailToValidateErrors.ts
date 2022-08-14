import ErrorCode from './ErrorCodes';
import ErrorList from './IErrorList';

const SendEmailToValidateError: ErrorList = {
  [ErrorCode.InvalidEmail]: {
    code: ErrorCode.InvalidEmail,
    message: 'E-mail não é válido',
  },
  [ErrorCode.invalidEmailValidation]: {
    code: ErrorCode.invalidEmailValidation,
    message: 'E-mail não cadastrado',
  },
  default: { code: ErrorCode.unhadleError, message: 'Erro interno.' },
};

export default SendEmailToValidateError;