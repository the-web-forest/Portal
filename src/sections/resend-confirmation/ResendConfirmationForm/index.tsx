import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, FormEventHandler, useState } from 'react';
import FilledButton, { FilledColor } from '../../../components/FilledButton';
import Input from '../../../components/Input';
import { WebForestLogo } from '../../../components/WebForestLogo';
import pagePaths from '../../../infra/core/pagePaths';
import AppError from '../../../infra/errors/AppError';
import ErrorCode from '../../../infra/errors/ErrorCodes';
import ToastCaller from '../../../infra/toast/ToastCaller';
import SendEmailToValidateEmailUseCase from '../../../infra/useCases/sendEmailToValidateEmail.usecase';
import { StrUtils } from '../../../utils/str-utils';
import styles from './styles.module.scss';

export const ResendConfirmationForm: FC = () => {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();

    const isValidEmail = StrUtils.isEmailValid(email);
    if (!isValidEmail) {
      setEmailError('Atenção: Insira um e-mail válido');
      return;
    }

    emailError && setEmailError('');

    new SendEmailToValidateEmailUseCase()
      .run(email)
      .then(() => {
        router.push(pagePaths.registerConfirm.send);
      })
      .catch(err => {
        ToastCaller.Error(
          toast,
          'Erro',
          'O E-mail inserido é inválido, você já possui cadastro?',
          4000,
        );
      });
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
        <FilledButton color={FilledColor.budGreen} width="260px" type="submit">
          Reenviar confirmação
        </FilledButton>
      </form>
    </div>
  );
};
