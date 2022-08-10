import { NextPage } from 'next';
import Head from 'next/head';
import { RecoverPasswordSuccess } from '../../sections/resend-password/ResendPasswordSuccess';
import { SignupHeader } from '../../sections/signup/SignupHeader';
import styles from '../../styles/Signup.success.module.scss';

const RecoverPasswordSuccessPage: NextPage = () => (
  <>
    <Head>
      <title>Sucesso recuperar senha</title>
    </Head>
    <div className={styles.container}>
      <SignupHeader />
      <div className={styles.body}>
        <hr className={styles.line} />
        <RecoverPasswordSuccess />
      </div>
    </div>
  </>
);

export default RecoverPasswordSuccessPage;
