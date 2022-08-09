import { NextPage } from 'next';
import Head from 'next/head';
import { ResendConfirmationSuccess } from '../../sections/resend-confirmation/ResendConfirmationSuccess';
import { SignupHeader } from '../../sections/signup/SignupHeader';
import styles from '../../styles/Signup.success.module.scss';

const ResendConfirmationSuccessPage: NextPage = () => (
  <>
    <Head>
      <title>Pagina de sucesso do reenvio de email de confirmação</title>
    </Head>
    <div className={styles.container}>
      <SignupHeader />
      <div className={styles.body}>
        <hr className={styles.line} />
        <ResendConfirmationSuccess />
      </div>
    </div>
  </>
);

export default ResendConfirmationSuccessPage;
