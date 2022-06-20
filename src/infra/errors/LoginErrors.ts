import ErrorCode from './ErrorCodes';
import ErrorList from './IErrorList';

const loginError: ErrorList = {
  [ErrorCode.invalidUserNameOrPassword]: {
    code: ErrorCode.invalidUserNameOrPassword,
    message: 'Usuário ou Senha invalido',
  },
  [ErrorCode.unverifiedEmail]: {
    code: ErrorCode.unverifiedEmail,
    message: 'E-mail não verificado, por favor cheque sua caixa de e-mail',
  },
  default: { code: ErrorCode.unhadleError, message: 'Erro interno.' },
};

export default loginError;
