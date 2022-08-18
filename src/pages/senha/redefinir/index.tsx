import { NextPage } from 'next';
import Head from 'next/head';
import { RecoverPasswordForm } from '../../../sections/new-password/RecoverPasswordForm';
import styles from '../../../styles/NewPassword.module.scss';

const NewPasswordPage: NextPage = () => (
  <>
    <Head>
      <title>Redefinir senha</title>
    </Head>
    <div className={styles.container}>
      <div className={styles.form}>
        <RecoverPasswordForm />
      </div>
      <div className={styles.background} />
    </div>
  </>
);

export default NewPasswordPage;
