import ErrorCode from './ErrorCodes';
import ErrorList from './IErrorList';

const RecoverPasswordError: ErrorList = {
  [ErrorCode.unverifiedEmail]: {
    code: ErrorCode.unverifiedEmail,
    message:
      'E-mail não verificado, confirme sua caixa de email ou informe o email novamente para confirmar',
  },
  [ErrorCode.InvalidEmail]: {
    code: ErrorCode.InvalidEmail,
    message: 'E-mail não cadastrado',
  },
  default: { code: ErrorCode.unhadleError, message: 'Erro interno.' },
};

export default RecoverPasswordError;
