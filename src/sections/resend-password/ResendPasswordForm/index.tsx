import { useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, FormEventHandler, useCallback, useState } from 'react';
import FilledButton, { FilledColor } from '../../../components/FilledButton';
import Input from '../../../components/Input';
import { WebForestLogo } from '../../../components/WebForestLogo';
import pagePaths from '../../../infra/core/pagePaths';
import AppError from '../../../infra/errors/AppError';
import ErrorCode from '../../../infra/errors/ErrorCodes';
import ToastCaller from '../../../infra/toast/ToastCaller';
import SendEmailToResetPasswordUseCase from '../../../infra/useCases/sendEmailToResetPassword.usecase';
import { StrUtils } from '../../../utils/str-utils';
import styles from './styles.module.scss';

export const RecoverPasswordForm: FC = () => {
  const toast = useToast();
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [awaitAsync, setAwaitAsync] = useState<boolean>(false);

  const handleSubmit: FormEventHandler = useCallback(
    async event => {
      event.preventDefault();
      try {
        setAwaitAsync(true);
        const isValidEmail = StrUtils.isEmailValid(email);
        if (!isValidEmail) {
          setEmailError('Atenção: Insira um e-mail válido');
          return;
        }
        emailError && setEmailError('');

        const Response: boolean =
          await new SendEmailToResetPasswordUseCase().run(email);
        Response && router.push(pagePaths.resendPassword.success);
      } catch (err: any) {
        if (err instanceof AppError) {
          switch (err.error.code) {
            case ErrorCode.unverifiedEmail:
              ToastCaller.Error(
                toast,
                'Erro',
                'Email inserido não verificado, reencaminhando para a pagina de reenvio de email...',
                4000,
              );
              router.push({ pathname: pagePaths.resendEmail.index });
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
            err.message ?? 'Erro imprevisto, contacte o suporte.',
          );
        }
      }
      finally{
        setAwaitAsync(false);
      }
    },
    [email, emailError, router],
  );

  return (
    <div className={styles.container}>
      <WebForestLogo />
      <h3>Recuperar senha</h3>
      <span>{`Enviaremos no e-mail os passos para recuperação da senha :)`}</span>
      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          placeholder="E-mail"
          width="100%"
          value={email}
          onChangeFunction={event => setEmail(event.target.value)}
          error={emailError}
        />
        <div className={styles.footerButtons}>
          <FilledButton
            color={FilledColor.budGreen}
            width="140px"
            type="submit"
            disabled={awaitAsync}
          >
            Enviar
          </FilledButton>

          <Link href={pagePaths.index}>
            <span className={styles.link}>Retornar para o login</span>
          </Link>
        </div>
      </form>
    </div>
  );
};
