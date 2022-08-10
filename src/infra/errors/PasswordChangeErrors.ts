import ErrorCode from './ErrorCodes';
import ErrorList from './IErrorList';

const passwordChangeError: ErrorList = {
  [ErrorCode.invalidPasswordReset]: {
    code: ErrorCode.invalidPasswordReset,
    message: 'O acesso pra alteração de senha não pode ser validado.',
  },
  [ErrorCode.unverifiedEmail]: {
    code: ErrorCode.unverifiedEmail,
    message: 'E-mail não verificado, por favor cheque sua caixa de e-mail',
  },
  [ErrorCode.InvalidEmail]: {
    code: ErrorCode.InvalidEmail,
    message: 'E-mail não cadastrado',
  },
  default: { code: ErrorCode.unhadleError, message: 'Erro interno.' },
};

export default passwordChangeError;
