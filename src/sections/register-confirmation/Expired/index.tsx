import { FC, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { SignupSuccessicon } from '../../../components/SignupSuccessIcon';
import FilledButton, { FilledColor } from '../../../components/FilledButton';
import pagePaths from '../../../infra/core/pagePaths';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import ToastCaller from '../../../infra/toast/ToastCaller';
import ErrorCode from '../../../infra/errors/ErrorCodes';
import AppError from '../../../infra/errors/AppError';
import SendEmailToValidateEmailUseCase from '../../../infra/useCases/sendEmailToValidateEmail.usecase';

export const RegisterConfirmationExpiredBox: FC = () => {
  const toast = useToast();
  const [email, setEmail] = useState<string>();
  const router = useRouter();
  useEffect(() => {
    const EmailParam = router.query.email;
    setEmail(EmailParam !== undefined ? EmailParam.toString() : undefined);
  }, [router.query.email]);

  const handleClick = async () => {
    try {
      if (email != undefined) {
        const Response: boolean =
          await new SendEmailToValidateEmailUseCase().run(email);
        Response && router.push(pagePaths.registerConfirm.sent);
      }
    } catch (err: any) {
      if (err instanceof AppError) {
        if (err.error.code === ErrorCode.unverifiedEmail) {
          ToastCaller.Error(
            toast,
            'Erro',
            'Email inserido não verificado, reencaminhando para a pagina de reenvio de email...',
          );
          router.push({ pathname: pagePaths.resendEmail.index });
        } else {
          ToastCaller.Error(
            toast,
            'Erro',
            err.error.code + ' - ' + err.error.message,
          );
        }
      } else {
        ToastCaller.Error(
          toast,
          'Erro',
          err.message ?? 'Erro imprevisto, contacte o suporte.',
        );
      }
    }
  };

  return (
    <div className={styles.container}>
      <AiOutlineClose
        color="#63AF53"
        style={{ width: '75px', height: '75px' }}
      />
      <h2 style={{ marginTop: '16px' }}>Link Expirado</h2>

      <div style={{ marginTop: '16px' }}>
        <FilledButton
          color={FilledColor.budGreen}
          width="175px"
          onClick={async () => {
            await handleClick();
          }}
        >
          Reenviar e-mail
        </FilledButton>
      </div>
      <div className={styles.iconWrapper}>
        <SignupSuccessicon />
      </div>
    </div>
  );
};
