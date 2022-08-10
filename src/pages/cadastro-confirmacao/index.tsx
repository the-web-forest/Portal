import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import pagePaths from '../../infra/core/pagePaths';
import Settings from '../../infra/core/settings';
import ValidateEmaillUseCase from '../../infra/useCases/validateEmail.usecase';
import { ResendConfirmationLoading } from '../../sections/register-confirmation/Loading';
import { SignupHeader } from '../../sections/signup/SignupHeader';
import styles from '../../styles/Signup.success.module.scss';

const ResendConfirmationLoadingPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const TokenParam = router.query.token as string;
    const EmailParam = router.query.email as string;

    if (!!TokenParam && !!EmailParam) {
      new ValidateEmaillUseCase()
        .run(EmailParam, TokenParam)
        .then(data => {
          router.push(pagePaths.registerConfirm.success);
        })
        .catch(err => {
          router.push(
            `${pagePaths.registerConfirm.expirated}?email=${EmailParam}`,
          );
        });
    } else {
      router.push(pagePaths.index);
    }
  }, [router.query.token, router.query.email, router]);

  return (
    <div className={styles.container}>
      <SignupHeader />
      <title>{`Confirmar E-mail - ${Settings.APP_NAME}`}</title>
      <div className={styles.body}>
        <hr className={styles.line} />
        <ResendConfirmationLoading />
      </div>
    </div>
  );
};

export default ResendConfirmationLoadingPage;
