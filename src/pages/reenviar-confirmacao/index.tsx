import { NextPage } from 'next';
import Head from 'next/head';
import { ResendConfirmationForm } from '../../sections/resend-confirmation/ResendConfirmationForm';
import styles from '../../styles/RecoverPassword.module.scss';

const ResendConfirmationPage: NextPage = () => (
  <>
    <Head>
      <title>Reenviar confirmação de email</title>
    </Head>
    <div className={styles.container}>
      <div className={styles.background} />
      <div className={styles.form}>
        <ResendConfirmationForm />
      </div>
    </div>
  </>
);

export default ResendConfirmationPage;
