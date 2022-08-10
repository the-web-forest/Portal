import { NextPage } from 'next';
import Head from 'next/head';
import { RecoverPasswordSuccessBox } from '../../../sections/new-password/RecoverPasswordSuccess';
import { RecoverPasswordSuccess } from '../../../sections/resend-password/ResendPasswordSuccess';
import { SignupHeader } from '../../../sections/signup/SignupHeader';
import styles from '../../../styles/Signup.success.module.scss';

const NewPasswordSuccessPage: NextPage = () => (
  <>
    <Head>
      <title>Pagina de senha redefinida com sucesso</title>
    </Head>
    <div className={styles.container}>
      <SignupHeader />
      <div className={styles.body}>
        <hr className={styles.line} />
        <RecoverPasswordSuccessBox />
      </div>
    </div>
  </>
);

export default NewPasswordSuccessPage;
