import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, FormEventHandler, useCallback, useState } from 'react';
import FilledButton, { FilledColor } from '../../../components/FilledButton';
import Input from '../../../components/Input';
import { WebForestLogo } from '../../../components/WebForestLogo';
import pagePaths from '../../../infra/core/pagePaths';
import SendEmailToResetPasswordUseCase from '../../../infra/useCases/sendEmailToResetPassword.usecase';
import { StrUtils } from '../../../utils/str-utils';
import styles from './styles.module.scss';

export const RecoverPasswordForm: FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const handleSubmit: FormEventHandler = useCallback(
    async event => {
      event.preventDefault();

      const isValidEmail = StrUtils.isEmailValid(email);
      if (!isValidEmail) {
        setEmailError('Atenção: Insira um e-mail válido');
        return;
      }
      emailError && setEmailError('');

      try {
        await new SendEmailToResetPasswordUseCase().run();
        router.push(pagePaths.passwordReset.success);
      } catch (err) {
        /* Implementar tratativa de erro */
      }
      router.push(pagePaths.passwordReset.success);
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
