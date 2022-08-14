import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useCallback,
  useContext,
  useState,
} from 'react';
import FilledButton, { FilledColor } from '../../../components/FilledButton';
import Input from '../../../components/Input';
import { WebForestLogo } from '../../../components/WebForestLogo';
import { AuthContext } from '../../../contexts/AuthContext';
import ILoginData from '../../../validations/DTO/ILoginData';
import LoginFormValidate from '../../../validations/LoginForm.validate';
import styles from './styles.module.scss';
import AppError from '../../../infra/errors/AppError';
import AttentionMessage from '../../../components/AttentionMessage';
import Link from 'next/link';
import pagePaths from '../../../infra/core/pagePaths';
import ErrorCode from '../../../infra/errors/ErrorCodes';
import Router from 'next/router';
import { useToast } from '@chakra-ui/react';
import ToastCaller from '../../../infra/toast/ToastCaller';
import Settings from '../../../infra/core/settings';

export const LoginForm: FC = () => {
  const [data, setData] = useState<ILoginData>({} as ILoginData);
  const [error, setError] = useState<ILoginData>({} as ILoginData);
  const [statusError, setStatusError] = useState(false);
  const toast = useToast();
  const { signIn } = useContext(AuthContext);

  const handleSubmit: FormEventHandler = useCallback(
    async event => {
      try {
        event.preventDefault();

        const errors = await new LoginFormValidate().validate(data);
        if (Object.keys(errors)?.length > 0) {
          setError(errors);
          return;
        }
        Object.keys(errors)?.length > 0 && setError({} as ILoginData);
        await signIn(data);
        setStatusError(false);
      } catch (err: any) {
        if (err instanceof AppError) {
          switch (err.error.code) {
            case ErrorCode.unverifiedEmail:
              Router.push(pagePaths.resendEmail.index);
              break;
            case ErrorCode.invalidUserNameOrPassword:
              setStatusError(true);
              break;
            default:
              ToastCaller.Error(
                toast,
                'Erro',
                err.error.code + ' - ' + err.error.message,
              );
              break;
          }
        } else {
          ToastCaller.Error(
            toast,
            'Erro',
            err.message + err.error.code ??
              'Erro imprevisto, contacte o suporte.',
          );
        }
      }
    },
    [data, signIn, toast],
  );

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      const { name, value } = event.target;
      setData(prevState => ({
        ...prevState,
        [name]: value,
      }));

      if (error[name as keyof ILoginData]) {
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
      <title>{`Login - ${Settings.APP_NAME}`}</title>
      <WebForestLogo />
      <div>
        <div
          className={styles.erroContainer}
          style={{ opacity: statusError ? 1 : 0 }}
        >
          <AttentionMessage message="Ops.. E-mail ou senha incorreto!" />
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            id="email"
            name="email"
            placeholder="E-mail"
            width="100%"
            value={data.email}
            onChangeFunction={handleChangeInput}
            error={error.email}
          />
          <Input
            id="current-password"
            name="password"
            placeholder="Senha"
            width="100%"
            value={data.password}
            onChangeFunction={handleChangeInput}
            type="password"
            error={error.password}
          />

          <FilledButton type="submit" color={FilledColor.budGreen} width="100%">
            Entrar
          </FilledButton>

          <div className={styles.linkContainer}>
            <Link href={pagePaths.resendPassword.index}>
              <span className={styles.link}>Esqueci minha senha</span>
            </Link>
            <Link href={pagePaths.signup.index}>
              <span className={styles.link}>Criar cadastro</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
