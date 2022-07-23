import ErrorCode from "./ErrorCodes";
import ErrorList from "./IErrorList";


const passwordChangeError: ErrorList = {
    [ErrorCode.invalidPasswordReset]: {
        code: ErrorCode.invalidPasswordReset,
        message: 'O acesso pra alteração de senha não pode ser validado.'
    },
    default : { code: ErrorCode.unhadleError, message: 'Erro interno.'},
};

export default passwordChangeError;