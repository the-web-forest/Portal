/* eslint-disable react-hooks/exhaustive-deps */
import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import FilledButton, { FilledColor } from '../../../components/FilledButton';
import Input from '../../../components/Input';
import { WebForestLogo } from '../../../components/WebForestLogo';
import styles from './styles.module.scss';
import INewPasswordData from '../../../validations/DTO/INewPasswordData';
import AppError from '../../../infra/errors/AppError';
import ErrorCode from '../../../infra/errors/ErrorCodes';
import RecoverPasswordValidate from '../../../validations/RecoverPasswordForm.validate';
import { useRouter } from 'next/router';
import AttentionMessage from '../../../components/AttentionMessage';
import PasswordChangeUseCase from '../../../infra/useCases/passwordChange.usecase';
import pagePaths from '../../../infra/core/pagePaths';
import { useToast } from '@chakra-ui/react';
import ToastCaller from '../../../infra/toast/ToastCaller';

export const RecoverPasswordForm: FC = () => {
  const toast = useToast();
  const router = useRouter();
  const [data, setData] = useState<INewPasswordData>({} as INewPasswordData);
  const [error, setError] = useState<INewPasswordData>({} as INewPasswordData);
  const [statusError, setStatusError] = useState(false);
  const [awaitAsync, setAwaitAsync] = useState<boolean>(false);

  useEffect(() => {
    const TokenParam = router.query.token;
    const EmailParam = router.query.email;
    setData(prevState => ({
      ...prevState,
      token: TokenParam != undefined ? TokenParam.toString() : undefined,
      email: EmailParam != undefined ? EmailParam.toString() : undefined,
    }));
  }, [router.query.token, router.query.email]);

  const validateEmptyFields = () => {
    if (!!!data.email || !!!data.token) {
      ToastCaller.Error(
        toast,
        'Erro',
        'O Link acessado obteve um erro, caso precise alterar sua senha requisite um novo link.',
        3000,
      );
      router.push(pagePaths.resendPassword.index);
    }
  };

  const handleSubmit: FormEventHandler = useCallback(
    async event => {
      event.preventDefault();
      try {
        setAwaitAsync(true);
        validateEmptyFields();

        const errors = await new RecoverPasswordValidate().validate(data);

        if (Object.keys(errors)?.length > 0) {
          setError(errors);
          return;
        }

        if (data.password !== data.confirm) {
          setStatusError(true);
          return;
        }

        setStatusError(false);
        const response: boolean = await new PasswordChangeUseCase().run(data);
        response && router.push(pagePaths.newPassword.success);
      } catch (err: any) {
        if (err instanceof AppError) {
          if (err.error.code == ErrorCode.invalidPasswordReset) {
            router.push({
              pathname: pagePaths.newPassword.expired,
              query: { email: data.email },
            });
            return;
          }

          if (err.error.code) {
            ToastCaller.Error(
              toast,
              'Erro',
              err.error.code + ' - ' + err.error.message,
            );
            return;
          }

          return;
        }

        ToastCaller.Error(
          toast,
          'Erro',
          err.message ?? 'Erro imprevisto, contacte o suporte.',
        );
        return;
      } finally {
        setAwaitAsync(false);
      }
    },
    [data, router, toast, validateEmptyFields],
  );

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      const { name, value } = event.target;
      setData(prevState => ({
        ...prevState,
        [name]: value,
      }));

      if (error[name as keyof INewPasswordData]) {
        setError(prevState => ({
          ...prevState,
          [name]: undefined,
        }));
      }
    },
    [error],
  );

  return (
    <div className={styles.container}>
      <WebForestLogo />
      <h3>Criar uma nova senha</h3>
      <div
        className={styles.erroContainer}
        style={{ opacity: statusError ? 1 : 0 }}
      >
        <AttentionMessage message="Ops.. As senhas informadas não condizem!" />
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          name="password"
          placeholder="Informar nova senha"
          width="100%"
          value={data.password}
          onChangeFunction={handleChangeInput}
          type="password"
          error={error.password}
        />
        <Input
          name="confirm"
          placeholder="Repetir nova senha"
          width="100%"
          value={data.confirm}
          onChangeFunction={handleChangeInput}
          type="password"
          error={error.confirm}
        />

        <FilledButton
          disabled={awaitAsync}
          type="submit"
          color={FilledColor.budGreen}
          width="100%"
        >
          Cadastrar nova senha
        </FilledButton>
      </form>
    </div>
  );
};
