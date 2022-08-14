import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, FormEventHandler, useState } from 'react';
import FilledButton, { FilledColor } from '../../../components/FilledButton';
import Input from '../../../components/Input';
import { WebForestLogo } from '../../../components/WebForestLogo';
import pagePaths from '../../../infra/core/pagePaths';
import AppError from '../../../infra/errors/AppError';
import ToastCaller from '../../../infra/toast/ToastCaller';
import SendEmailToValidateEmailUseCase from '../../../infra/useCases/sendEmailToValidateEmail.usecase';
import { StrUtils } from '../../../utils/str-utils';
import styles from './styles.module.scss';

export const ResendConfirmationForm: FC = () => {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [awaitAsync, setAwaitAsync] = useState<boolean>(false);

  const handleSubmit: FormEventHandler = async event => {
    event.preventDefault();
    try {
      setAwaitAsync(true);

      const isValidEmail = StrUtils.isEmailValid(email);
      if (!isValidEmail) {
        setEmailError('Atenção: Insira um e-mail válido');
        return;
      }

      emailError && setEmailError('');

      const response = await new SendEmailToValidateEmailUseCase().run(email);
      response && router.push(pagePaths.registerConfirm.sent);
    } catch (err: any) {
      if (err instanceof AppError) {
        ToastCaller.Error(
          toast,
          'Erro',
          err.error.code + ' - ' + err.error.message,
        );
      } else {
        ToastCaller.Error(
          toast,
          'Erro',
          err.message ?? 'Erro imprevisto, contacte o suporte.',
        );
      }
    } finally {
      setAwaitAsync(false);
    }
  };

  return (
    <div className={styles.container}>
      <WebForestLogo />
      <h3>Reenviar e-mail de confirmação</h3>
      <span>Notamos que você já se cadastrou, vamos reenviar</span>
      <span>o link de confirmação, insira o seu e-mail.</span>
      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          placeholder="E-mail"
          width="100%"
          value={email}
          onChangeFunction={event => setEmail(event.target.value)}
          error={emailError}
        />
        <FilledButton disabled={awaitAsync} color={FilledColor.budGreen} width="260px" type="submit">
          Reenviar confirmação
        </FilledButton>
      </form>
    </div>
  );
};
